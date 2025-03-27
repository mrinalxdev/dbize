import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { SchemaEditor } from "./components/SchemaEditor";
import { SqlPreview } from "./components/SqlPreview";
import { Toaster } from "./components/ui/toaster";
import { GuideContent } from "./components/GuideContent";

function App() {
  return (
    <div className="flex h-screen flex-col bg-zinc-50 dark:bg-zinc-900">
      <header className="border-b bg-white px-6 py-3 shadow-sm dark:bg-zinc-800">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">DBize</h1>
          <div className="flex items-center space-x-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <Tabs defaultValue="editor" className="flex flex-1 flex-col">
        <div className="border-b bg-white px-6 dark:bg-zinc-800">
          <TabsList className="h-12 bg-transparent">
            <TabsTrigger
              value="editor"
              className="h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:border-zinc-100"
            >
              Schema Editor
            </TabsTrigger>
            <TabsTrigger
              value="guide"
              className="h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:border-zinc-100"
            >
              User Guide
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="editor" className="mt-0 flex flex-1 overflow-hidden p-0">
          <div className="h-full flex-1">
            <SchemaEditor />
          </div>

          <div className="h-full w-84 overflow-auto border-l bg-white shadow-md dark:bg-zinc-800">
            <SqlPreview />
          </div>
        </TabsContent>

        <TabsContent value="guide" className="mt-0 flex-1 overflow-auto p-6">
          <GuideContent />
        </TabsContent>
      </Tabs>

      <Toaster />
    </div>
  );
}

export default App;
