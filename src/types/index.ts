import type { Node, Edge } from 'reactflow';

export interface NodeData {
    label: string;
    description?: string;
    assignee?: string;
    dueDate?: string;
    approverRole?: string;
    autoApprove?: boolean;
    automationId?: string;
    parameters?: Record<string, string>;
    [key: string]: unknown;
}

export interface SavedWorkflow {
    nodes: Node[];
    edges: Edge[];
    name: string;
    date: string;
}
