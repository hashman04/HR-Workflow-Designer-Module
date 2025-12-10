import React, { memo } from 'react';
import { Position } from 'reactflow';
import { CheckCircle } from 'lucide-react';
import BaseNode from '../components/BaseNode';
import type { NodeData } from '../types';

const ApprovalNode = memo(({ id, data, selected }: { id: string, data: NodeData, selected: boolean }) => {
    return (
        <BaseNode
            id={id}
            data={data}
            selected={selected}
            title="Data Validation"
            subtitle="Ensuring Data Accuracy"
            icon={<CheckCircle size={20} />}
            color="yellow"
            handles={{
                target: [Position.Top],
                source: [Position.Bottom]
            }}
        />
    );
});

export default ApprovalNode;
