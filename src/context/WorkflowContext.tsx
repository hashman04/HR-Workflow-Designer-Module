import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    type Node,
    type Edge,
    type OnNodesChange,
    type OnEdgesChange,
    type Connection
} from 'reactflow';
import type { SavedWorkflow } from '../types';

interface WorkflowContextType {
    nodes: Node[];
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    edges: Edge[];
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: (connection: Connection) => void;
    addNode: (node: Node) => void;
    selectedNode: Node | null;
    setSelectedNode: (node: Node | null) => void;
    executionStatus: Record<string, 'pending' | 'running' | 'success' | 'failed'>;
    setExecutionStatus: React.Dispatch<React.SetStateAction<Record<string, 'pending' | 'running' | 'success' | 'failed'>>>;
    saveWorkflow: () => void;
    loadWorkflow: (name: string) => void;
    deleteNode: (nodeId: string) => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [executionStatus, setExecutionStatus] = useState<Record<string, 'pending' | 'running' | 'success' | 'failed'>>({});

    React.useEffect(() => {
        const savedWorkflow = localStorage.getItem('workflow-data');
        if (savedWorkflow) {
            const { nodes, edges } = JSON.parse(savedWorkflow);
            setNodes(nodes || []);
            setEdges(edges || []);
        }
    }, []);

    const onNodesChange: OnNodesChange = (changes) => {
        setNodes((nds) => applyNodeChanges(changes, nds));
    };

    const onEdgesChange: OnEdgesChange = (changes) => {
        setEdges((eds) => applyEdgeChanges(changes, eds));
    };

    const onConnect = (connection: Connection) => {
        setEdges((eds) => addEdge(connection, eds));
    };

    const addNode = (node: Node) => {
        setNodes((nds) => nds.concat(node));
    };

    return (
        <WorkflowContext.Provider
            value={{
                nodes,
                setNodes,
                edges,
                setEdges,
                onNodesChange,
                onEdgesChange,
                onConnect,
                addNode,

                selectedNode,
                setSelectedNode,
                executionStatus,
                setExecutionStatus,
                saveWorkflow: () => {
                    const name = prompt('Enter workflow name:', 'My Workflow');
                    if (!name) return;

                    const workflow: SavedWorkflow = { nodes, edges, name, date: new Date().toISOString() };
                    const savedWorkflows: SavedWorkflow[] = JSON.parse(localStorage.getItem('saved-workflows') || '[]');

                    // Update if exists or add new
                    const existingIndex = savedWorkflows.findIndex((w) => w.name === name);
                    if (existingIndex >= 0) {
                        savedWorkflows[existingIndex] = workflow;
                    } else {
                        savedWorkflows.push(workflow);
                    }

                    localStorage.setItem('saved-workflows', JSON.stringify(savedWorkflows));
                    // Also save current state as 'latest' for auto-load
                    localStorage.setItem('workflow-data', JSON.stringify({ nodes, edges }));

                    alert('Workflow saved successfully!');
                    // Trigger a custom event to notify Sidebar to update
                    window.dispatchEvent(new Event('workflowSaved'));
                },
                loadWorkflow: (name: string) => {
                    const savedWorkflows: SavedWorkflow[] = JSON.parse(localStorage.getItem('saved-workflows') || '[]');
                    const workflow = savedWorkflows.find((w) => w.name === name);
                    if (workflow) {
                        setNodes(workflow.nodes || []);
                        setEdges(workflow.edges || []);
                        setExecutionStatus({});
                    }
                },
                deleteNode: (nodeId: string) => {
                    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
                    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
                    setSelectedNode(null);
                },
            }}
        >
            {children}
        </WorkflowContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWorkflow = () => {
    const context = useContext(WorkflowContext);
    if (!context) {
        throw new Error('useWorkflow must be used within a WorkflowProvider');
    }
    return context;
};
