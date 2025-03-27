import { create } from 'zustand';
import { Edge, Node, Connection, addEdge, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from 'reactflow';

export type ColumnType =
  | 'varchar'
  | 'text'
  | 'integer'
  | 'float'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'time'
  | 'uuid'
  | 'json'
  | 'bigint';

export interface Column {
  id: string;
  name: string;
  type: ColumnType;
  length?: number;
  nullable: boolean;
  primaryKey: boolean;
  unique: boolean;
  defaultValue?: string;
}

export interface TableData {
  name: string;
  columns: Column[];
}

export interface TableNode extends Node {
  data: TableData;
  type?: 'tableNode';
}

export interface SchemaState {
  nodes: TableNode[];
  edges: Edge[];
  setNodes: (nodes: TableNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addTable: (table: TableData) => void;
  updateTable: (id: string, data: Partial<TableData>) => void;
  addColumn: (tableId: string, column: Column) => void;
  updateColumn: (tableId: string, columnId: string, data: Partial<Column>) => void;
  removeColumn: (tableId: string, columnId: string) => void;
  removeTable: (id: string) => void;
  getTableById: (id: string) => TableNode | undefined;
}

export const useSchemaStore = create<SchemaState>((set, get) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as TableNode[],
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          label: 'relates to',
          style: { stroke: '#374151' }
        },
        get().edges
      ),
    });
  },

  addTable: (table) => {
    const newNode: TableNode = {
      id: `table-${Date.now()}`,
      type: 'tableNode',
      position: { x: 250, y: 250 },
      data: table,
    };

    set({ nodes: [...get().nodes, newNode] });
  },

  updateTable: (id, data) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...data,
            },
          };
        }
        return node;
      }),
    });
  },

  addColumn: (tableId, column) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === tableId) {
          return {
            ...node,
            data: {
              ...node.data,
              columns: [...node.data.columns, column],
            },
          };
        }
        return node;
      }),
    });
  },

  updateColumn: (tableId, columnId, data) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === tableId) {
          return {
            ...node,
            data: {
              ...node.data,
              columns: node.data.columns.map((column) => {
                if (column.id === columnId) {
                  return {
                    ...column,
                    ...data,
                  };
                }
                return column;
              }),
            },
          };
        }
        return node;
      }),
    });
  },

  removeColumn: (tableId, columnId) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === tableId) {
          return {
            ...node,
            data: {
              ...node.data,
              columns: node.data.columns.filter((column) => column.id !== columnId),
            },
          };
        }
        return node;
      }),
    });
  },

  removeTable: (id) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id),
    });
  },

  getTableById: (id) => {
    return get().nodes.find((node) => node.id === id);
  },
}));
