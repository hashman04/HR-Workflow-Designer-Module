import React, { memo } from 'react';
import { Position } from 'reactflow';
import { ClipboardList } from 'lucide-react';
import BaseNode from '../components/BaseNode';
import type { NodeData } from '../types';

const TaskNode = memo(({ id, data, selected }: { id: string, data: NodeData, selected: boolean }) => {
    return (
        <BaseNode
            id={id}
            data={data}
            selected={selected}
            title="Data Collection"
            subtitle="Gathering Data Connected"
            icon={<ClipboardList size={20} />}
            color="blue"
            handles={{
                target: [Position.Top],
                source: [Position.Bottom]
            }}
        />
    );
});

export default TaskNode;
