import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  Node,
  NodeTypes,
  MiniMap,
  Panel,
  ReactFlowInstance,
  BackgroundVariant
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useSchemaStore, TableNode } from '../store/schema-store';
import { TableNode as TableNodeComponent } from './TableNode';
import { AddTableDialog } from './AddTableDialog';
import { Button } from './ui/button';
import { Download, ZoomIn, ZoomOut, Maximize2, Move } from 'lucide-react';

const nodeTypes: NodeTypes = {
  tableNode: TableNodeComponent,
};

// Extended interface to include toImage
interface ExtendedReactFlowInstance extends ReactFlowInstance {
  toImage: (options: { quality?: number, width?: number, height?: number, backgroundColor?: string }) => string;
}

export const SchemaEditor = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useSchemaStore();

  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  }, []);

  const fitView = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2 });
    }
  }, [reactFlowInstance]);

  useEffect(() => {
    if (reactFlowInstance && nodes.length) {
      // Fit view when nodes change (after a short delay to allow for animations)
      const timer = setTimeout(() => {
        fitView();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [nodes.length, reactFlowInstance, fitView]);

  const downloadImage = useCallback(() => {
    if (reactFlowInstance) {
      const instance = reactFlowInstance as unknown as ExtendedReactFlowInstance;
      const dataURL = instance.toImage({
        quality: 1,
        width: 1920,
        height: 1080,
        backgroundColor: '#f4f4f5',
      });

      // Create a link and trigger the download
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'db-schema.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [reactFlowInstance]);

  return (
    <div className="h-full flex flex-col relative">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onInit={onInit}
          minZoom={0.1}
          maxZoom={2}
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#374151' },
          }}
          proOptions={{ hideAttribution: true }}
          className="bg-zinc-50 dark:bg-zinc-900"
        >
          <Background
            color="#99999930"
            gap={20}
            size={1}
          />
          <MiniMap
            nodeStrokeWidth={3}
            zoomable
            pannable
            className="!bg-white dark:!bg-zinc-800 !shadow-md !rounded-md !border-zinc-200 dark:!border-zinc-700"
          />
          <Controls
            className="!bg-white dark:!bg-zinc-800 !shadow-md !rounded-md !border-zinc-200 dark:!border-zinc-700"
            showInteractive={false}
          />

          <Panel position="top-left" className="ml-2 mt-2">
            <div className="flex items-center gap-2">
              <AddTableDialog />
              <Button
                variant="outline"
                size="sm"
                onClick={downloadImage}
                className="bg-white dark:bg-zinc-800 flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={fitView}
                className="bg-white dark:bg-zinc-800 flex items-center gap-1"
              >
                <Maximize2 className="w-4 h-4" />
                Fit View
              </Button>
            </div>
          </Panel>
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};
