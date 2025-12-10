import React, { useCallback, useRef } from 'react';
import ReactFlow, {
    Background,
    Controls,
    ReactFlowProvider,
    type Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import { useWorkflow } from '../context/WorkflowContext';
import { nodeTypes } from '../nodes';

const WorkflowCanvasContent = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addNode,
        setSelectedNode,
    } = useWorkflow();

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowWrapper.current?.getBoundingClientRect();
            if (!position) return;

            const clientX = event.clientX;
            const clientY = event.clientY;

            // Project coordinates (this is a simplified version, ideally use reactFlowInstance.project)
            // For now, we'll just use relative coordinates which is "good enough" for initial drop
            // or we can get the instance from context if we exposed it.
            // Let's just do simple offset for now.

            const newNode: Node = {
                id: uuidv4(),
                type,
                position: {
                    x: clientX - position.left - 75, // center the node
                    y: clientY - position.top - 25,
                },
                data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` },
            };

            addNode(newNode);
        },
        [addNode]
    );

    const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
        setSelectedNode(node);
    }, [setSelectedNode]);

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
    }, [setSelectedNode]);

    return (
        <div className="flex-1 h-full" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                defaultEdgeOptions={{ type: 'smoothstep', animated: true, style: { stroke: '#b1b1b7', strokeWidth: 2 } }}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};

const WorkflowCanvas = () => {
    return (
        <ReactFlowProvider>
            <WorkflowCanvasContent />
        </ReactFlowProvider>
    );
};

export default WorkflowCanvas;
