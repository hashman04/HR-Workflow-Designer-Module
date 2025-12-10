import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useWorkflow } from '../context/WorkflowContext';
import { getAutomations, type Automation } from '../api/mockApi';
import type { NodeData } from '../types';

const AutomatedNodeForm = () => {
    const { selectedNode, setNodes } = useWorkflow();
    const { register, handleSubmit, reset, watch } = useForm<NodeData>();
    const [automations, setAutomations] = useState<Automation[]>([]);
    const selectedAutomationId = watch('automationId');

    useEffect(() => {
        getAutomations().then(setAutomations);
    }, []);

    useEffect(() => {
        if (selectedNode) {
            reset({
                label: selectedNode.data.label || 'Automated Step',
                automationId: selectedNode.data.automationId || '',
                params: selectedNode.data.params || {},
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

    const selectedAutomation = automations.find(a => a.id === selectedAutomationId);

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
                <label className="block text-sm font-medium text-gray-700">Automation</label>
                <select
                    {...register('automationId')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                >
                    <option value="">Select an automation</option>
                    {automations.map(a => (
                        <option key={a.id} value={a.id}>{a.label}</option>
                    ))}
                </select>
            </div>
            {selectedAutomation && selectedAutomation.params.map((param: string) => (
                <div key={param}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">{param}</label>
                    <input
                        {...register(`params.${param}`)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                    />
                </div>
            ))}
        </form>
    );
};

export default AutomatedNodeForm;
