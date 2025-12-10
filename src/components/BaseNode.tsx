import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { MoreVertical } from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';

import type { NodeData } from '../types';

interface BaseNodeProps {
    id: string;
    data: NodeData;
    selected: boolean;
    icon: React.ReactNode;
    color: 'green' | 'blue' | 'purple' | 'yellow' | 'red';
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
    handles?: {
        source?: Position[];
        target?: Position[];
    };
}

const BaseNode = ({ id, data, selected, icon, color, title, subtitle, children, handles }: BaseNodeProps) => {
    const { executionStatus } = useWorkflow();
    const status = executionStatus[id];

    const colorStyles = {
        green: { border: 'border-green-200', bg: 'bg-green-50', text: 'text-green-600', iconBg: 'bg-green-100' },
        blue: { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-100' },
        purple: { border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-100' },
        yellow: { border: 'border-yellow-200', bg: 'bg-yellow-50', text: 'text-yellow-600', iconBg: 'bg-yellow-100' },
        red: { border: 'border-red-200', bg: 'bg-red-50', text: 'text-red-600', iconBg: 'bg-red-100' },
    };

    const styles = colorStyles[color];

    let borderClass = `border-2 ${selected ? 'border-blue-500 shadow-md' : 'border-gray-100 hover:border-gray-300'}`;
    if (status === 'running') borderClass = 'border-2 border-blue-500 shadow-lg ring-2 ring-blue-200';
    if (status === 'success') borderClass = 'border-2 border-green-500 shadow-md';
    if (status === 'failed') borderClass = 'border-2 border-red-500 shadow-md';

    return (
        <div className={`w-80 bg-white rounded-lg shadow-sm transition-all ${borderClass}`}>
            {/* Header */}
            <div className="p-4 flex items-start justify-between">
                <div className="flex items-start">
                    <div className={`w-10 h-10 rounded-lg ${styles.iconBg} ${styles.text} flex items-center justify-center mr-3`}>
                        {icon}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{data.label || title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{subtitle || data.description || "No description"}</p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={16} />
                </button>
            </div>

            {/* Body (Custom Content) */}
            {children && (
                <div className="px-4 pb-4">
                    {children}
                </div>
            )}

            {/* Handles */}
            {handles?.target?.map((pos, i) => (
                <Handle
                    key={`target-${i}`}
                    type="target"
                    position={pos}
                    className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white"
                    style={{ left: pos === Position.Top ? '50%' : undefined, top: pos === Position.Left ? '50%' : undefined }}
                />
            ))}
            {handles?.source?.map((pos, i) => (
                <Handle
                    key={`source-${i}`}
                    type="source"
                    position={pos}
                    className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white"
                    style={{ right: pos === Position.Right ? '-6px' : undefined, bottom: pos === Position.Bottom ? '-6px' : undefined }}
                />
            ))}
        </div>
    );
};

export default memo(BaseNode);
