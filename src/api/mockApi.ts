import type { Node, Edge } from 'reactflow';

export interface Automation {
    id: string;
    label: string;
    params: string[];
}

export const getAutomations = async (): Promise<Automation[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
        { id: "send_email", label: "Send Email", params: ["to", "subject"] },
        { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] },
        { id: "slack_notify", label: "Slack Notification", params: ["channel", "message"] },
    ];
};

export interface SimulationLog {
    stepId: string;
    nodeLabel: string;
    status: 'success' | 'pending' | 'failed';
    message: string;
    timestamp: string;
}

export const simulateWorkflow = async (
    nodes: Node[],
    edges: Edge[],
    currentUserRole: string,
    onStep?: (log: SimulationLog) => void
): Promise<SimulationLog[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const logs: SimulationLog[] = [];
    const visited = new Set<string>();

    // Find start node
    const startNodes = nodes.filter((n) => n.type === 'start');
    if (startNodes.length === 0) {
        const errorLog: SimulationLog = {
            stepId: 'error',
            nodeLabel: 'System',
            status: 'failed',
            message: 'No Start Node found. The workflow must have exactly one Start Node.',
            timestamp: new Date().toISOString(),
        };
        if (onStep) onStep(errorLog);
        return [errorLog];
    }
    if (startNodes.length > 1) {
        const errorLog: SimulationLog = {
            stepId: 'error',
            nodeLabel: 'System',
            status: 'failed',
            message: 'Multiple Start Nodes found. The workflow must have exactly one Start Node.',
            timestamp: new Date().toISOString(),
        };
        if (onStep) onStep(errorLog);
        return [errorLog];
    }

    const startNode = startNodes[0];

    let currentNode: Node | undefined = startNode;

    while (currentNode) {
        // Simulate processing time per step
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (visited.has(currentNode.id)) {
            const errorLog: SimulationLog = {
                stepId: currentNode.id,
                nodeLabel: currentNode.data.label,
                status: 'failed',
                message: 'Cycle detected!',
                timestamp: new Date().toISOString(),
            };
            logs.push(errorLog);
            if (onStep) onStep(errorLog);
            break;
        }

        visited.add(currentNode.id);

        // Role Check for Approval Nodes
        if (currentNode.type === 'approval') {
            const requiredRole = currentNode.data.approverRole;
            if (requiredRole && requiredRole.toLowerCase() !== currentUserRole.toLowerCase()) {
                const errorLog: SimulationLog = {
                    stepId: currentNode.id,
                    nodeLabel: currentNode.data.label,
                    status: 'failed',
                    message: `Permission Denied: Requires '${requiredRole}' role. Current role: '${currentUserRole}'.`,
                    timestamp: new Date().toISOString(),
                };
                logs.push(errorLog);
                if (onStep) onStep(errorLog);
                break;
            }
        }

        const successLog: SimulationLog = {
            stepId: currentNode.id,
            nodeLabel: currentNode.data.label,
            status: 'success',
            message: `Executed ${currentNode.data.label}`,
            timestamp: new Date().toISOString(),
        };
        logs.push(successLog);
        if (onStep) onStep(successLog);

        if (currentNode.type === 'end') {
            break;
        }

        // Find next node
        const outEdge = edges.find((e) => e.source === currentNode?.id);
        if (!outEdge) {
            if (currentNode.type !== 'end') {
                const errorLog: SimulationLog = {
                    stepId: currentNode.id,
                    nodeLabel: currentNode.data.label,
                    status: 'pending',
                    message: 'Workflow stopped unexpectedly (no outgoing connection).',
                    timestamp: new Date().toISOString(),
                };
                logs.push(errorLog);
                if (onStep) onStep(errorLog);
            }
            break;
        }

        currentNode = nodes.find((n) => n.id === outEdge.target);
    }

    return logs;
};
