import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useWorkflow } from '../context/WorkflowContext';

import type { NodeData } from '../types';

const ApprovalNodeForm = () => {
    const { selectedNode, setNodes } = useWorkflow();
    const { register, handleSubmit, reset } = useForm<NodeData>();

    useEffect(() => {
        if (selectedNode) {
            reset({
                label: selectedNode.data.label || 'Approval',
                approverRole: selectedNode.data.approverRole || '',
                autoApproveThreshold: selectedNode.data.autoApproveThreshold || undefined, // undefined vs string
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
                <label className="block text-sm font-medium text-gray-700">Approver Role</label>
                <input
                    {...register('approverRole')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Auto-approve Threshold (hours)</label>
                <input
                    type="number"
                    {...register('autoApproveThreshold')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                />
            </div>
        </form>
    );
};

export default ApprovalNodeForm;
