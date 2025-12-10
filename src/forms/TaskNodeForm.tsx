import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useWorkflow } from '../context/WorkflowContext';
import type { NodeData } from '../types';

import KeyValueInput from '../components/KeyValueInput';

const TaskNodeForm = () => {
    const { selectedNode, setNodes } = useWorkflow();
    const { register, handleSubmit, reset, control } = useForm<NodeData>();

    useEffect(() => {
        if (selectedNode) {
            reset({
                label: selectedNode.data.label || 'Task',
                description: selectedNode.data.description || '',
                assignee: selectedNode.data.assignee || '',
                dueDate: selectedNode.data.dueDate || '',
                customFields: selectedNode.data.customFields || [],
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
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    {...register('description')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Assignee</label>
                <input
                    {...register('assignee')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                    type="date"
                    {...register('dueDate')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                />
            </div>
            <KeyValueInput control={control} register={register} name="customFields" label="Custom Fields" />
        </form>
    );
};

export default TaskNodeForm;
