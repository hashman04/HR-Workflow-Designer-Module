import React from 'react';
import { WorkflowProvider, useWorkflow } from './context/WorkflowContext';
import Sidebar from './components/Sidebar';
import WorkflowCanvas from './components/WorkflowCanvas';
import NodeConfigPanel from './components/NodeConfigPanel';
import SimulationPanel from './components/SimulationPanel';

function App() {
  return (
    <WorkflowProvider>
      <div className="flex h-screen w-screen bg-gray-50 overflow-hidden font-sans">
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full relative">
          {/* Header */}
          <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
            <h1 className="text-lg font-semibold text-gray-800">Workflow Designer</h1>
            <div className="flex items-center space-x-2">
              <SaveButton />
            </div>
          </header>

          <div className="flex-1 relative">
            <WorkflowCanvas />
            <SimulationPanel />
          </div>
        </main>

        {/* Right Panel */}
        <aside className="w-80 bg-white border-l border-gray-200 h-full flex flex-col">
          <NodeConfigPanel />
        </aside>
      </div>
    </WorkflowProvider>
  );
}

const SaveButton = () => {
  const { saveWorkflow, loadWorkflow } = useWorkflow();

  React.useEffect(() => {
    const handleLoad = (e: Event) => {
      const customEvent = e as CustomEvent;
      loadWorkflow(customEvent.detail);
    };
    window.addEventListener('loadWorkflow', handleLoad);
    return () => window.removeEventListener('loadWorkflow', handleLoad);
  }, [loadWorkflow]);

  return (
    <button
      onClick={saveWorkflow}
      className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
    >
      Save Workflow
    </button>
  );
};

export default App;
