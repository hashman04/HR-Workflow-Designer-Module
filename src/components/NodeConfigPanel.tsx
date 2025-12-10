import React from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import StartNodeForm from '../forms/StartNodeForm';
import TaskNodeForm from '../forms/TaskNodeForm';
import ApprovalNodeForm from '../forms/ApprovalNodeForm';
import AutomatedNodeForm from '../forms/AutomatedNodeForm';
import EndNodeForm from '../forms/EndNodeForm';
import { X } from 'lucide-react';

const NodeConfigPanel = () => {
    const { selectedNode, setSelectedNode, deleteNode } = useWorkflow();

    if (!selectedNode) {
        return null;
    }

    const renderForm = () => {
        switch (selectedNode.type) {
            case 'start':
                return <StartNodeForm />;
            case 'task':
                return <TaskNodeForm />;
            case 'approval':
                return <ApprovalNodeForm />;
            case 'automated':
                return <AutomatedNodeForm />;
            case 'end':
                return <EndNodeForm />;
            default:
                return <div>No configuration available for this node type.</div>;
        }
    };

    return (
        <div className="w-80 bg-white border-l border-gray-200 h-full flex flex-col shadow-xl absolute right-0 top-0 z-10">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">Configuration</h2>
                <button onClick={() => setSelectedNode(null)} className="text-gray-500 hover:text-gray-700">
                    <X size={20} />
                </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
                {renderForm()}
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <button
                    onClick={() => deleteNode(selectedNode.id)}
                    className="w-full py-2 px-4 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
                >
                    Delete Node
                </button>
            </div>
        </div>
    );
};

export default NodeConfigPanel;
