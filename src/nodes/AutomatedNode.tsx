import React, { memo } from 'react';
import { Position } from 'reactflow';
import { Zap } from 'lucide-react';
import BaseNode from '../components/BaseNode';
import type { NodeData } from '../types';

const AutomatedNode = memo(({ id, data, selected }: { id: string, data: NodeData, selected: boolean }) => {
    return (
        <BaseNode
            id={id}
            data={data}
            selected={selected}
            title="Action Trigger"
            subtitle="Performing Tasks Conditions"
            icon={<Zap size={20} />}
            color="purple"
            handles={{
                target: [Position.Top],
                source: [Position.Bottom]
            }}
        />
    );
});

export default AutomatedNode;
