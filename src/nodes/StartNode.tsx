import React, { memo } from 'react';
import { Position } from 'reactflow';
import { Play } from 'lucide-react';
import BaseNode from '../components/BaseNode';
import type { NodeData } from '../types';

const StartNode = memo(({ id, data, selected }: { id: string, data: NodeData, selected: boolean }) => {
    return (
        <BaseNode
            id={id}
            data={data}
            selected={selected}
            title="Initialize Data"
            subtitle="Initializing for Automation"
            icon={<Play size={20} />}
            color="green"
            handles={{
                source: [Position.Bottom]
            }}
        />
    );
});

export default StartNode;
