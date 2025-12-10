import React, { memo } from 'react';
import { Position } from 'reactflow';
import { Square } from 'lucide-react';
import BaseNode from '../components/BaseNode';
import type { NodeData } from '../types';

const EndNode = memo(({ id, data, selected }: { id: string, data: NodeData, selected: boolean }) => {
    return (
        <BaseNode
            id={id}
            data={data}
            selected={selected}
            title="Action Completion"
            subtitle="Automation Complete"
            icon={<Square size={20} />}
            color="red"
            handles={{
                target: [Position.Top]
            }}
        />
    );
});

export default EndNode;
