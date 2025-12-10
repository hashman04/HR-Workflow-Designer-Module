import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useWorkflow } from '../context/WorkflowContext';

import type { NodeData } from '../types';

const EndNodeForm = () => {
    const { selectedNode, setNodes } = useWorkflow();
    const { register, handleSubmit, reset } = useForm<NodeData>();

    useEffect(() => {
        if (selectedNode) {
            reset({
                label: selectedNode.data.label || 'End',
                endMessage: selectedNode.data.endMessage || '',
                isSummary: selectedNode.data.isSummary || false,
            });
        }
    }, [selectedNode, reset]);

    const onSubmit = (data: NodeData) => {
        if (!selectedNode) return;
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === selectedNode.id) {
                    return {
                        ...node,
                        data: { ...node.data, ...data },
                    };
                }
                return node;
            })
        );
    };

    return (
        <form onChange={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    {...register('label')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">End Message</label>
                <textarea
                    {...register('endMessage')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                />
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    {...register('isSummary')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Show Summary</label>
            </div>
        </form>
    );
};

export default EndNodeForm;
