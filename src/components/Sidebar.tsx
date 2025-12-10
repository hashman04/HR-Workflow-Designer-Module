import React from 'react';
import {
    Play,
    ClipboardList,
    CheckCircle,
    Zap,
    Square,
    Settings,
    HelpCircle
} from 'lucide-react';
import type { SavedWorkflow } from '../types';

const Sidebar = () => {


    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full font-sans">
            {/* Header */}
            <div className="p-6 flex items-center border-b border-gray-100">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3 text-white font-bold text-xl">
                    C
                </div>
                <span className="text-xl font-bold text-gray-800">CodeAuto</span>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4">
                {/* Draggable Nodes Section */}
                <div className="mb-6">
                    <h3 className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Components</h3>
                    <div className="px-4 space-y-3">
                        <DraggableNode type="start" label="Start Node" icon={<Play size={16} />} color="green" />
                        <DraggableNode type="task" label="Task Node" icon={<ClipboardList size={16} />} color="blue" />
                        <DraggableNode type="approval" label="Approval Node" icon={<CheckCircle size={16} />} color="yellow" />
                        <DraggableNode type="automated" label="Automated Step" icon={<Zap size={16} />} color="purple" />
                        <DraggableNode type="end" label="End Node" icon={<Square size={16} />} color="red" />
                    </div>
                </div>

                {/* Saved Workflows Section */}
                <div className="mb-6">
                    <h3 className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Saved Workflows</h3>
                    <SavedWorkflowsList />
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 space-y-1">
                <NavItem icon={<Settings size={18} />} label="Settings" />
                <NavItem icon={<HelpCircle size={18} />} label="Help & Support" />
            </div>
        </aside>
    );
};

const NavItem = ({ icon, label, active = false, badge }: { icon: React.ReactNode, label: string, active?: boolean, badge?: string }) => (
    <a href="#" className={`flex items-center px-6 py-2 text-sm font-medium transition-colors ${active ? 'text-red-500 bg-red-50 border-r-2 border-red-500' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
        <span className="mr-3">{icon}</span>
        <span className="flex-1">{label}</span>
        {badge && <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">{badge}</span>}
    </a>
);

const DraggableNode = ({ type, label, icon, color }: { type: string, label: string, icon: React.ReactNode, color: string }) => {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const colorClasses: Record<string, string> = {
        green: 'bg-green-50 text-green-600 border-green-200',
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-200',
        red: 'bg-red-50 text-red-600 border-red-200',
    };

    return (
        <div
            className={`flex items-center p-2 border rounded-md cursor-grab hover:shadow-sm transition-all ${colorClasses[color]} bg-white border-gray-200`}
            onDragStart={(event) => onDragStart(event, type)}
            draggable
        >
            <div className={`mr-2 ${colorClasses[color].split(' ')[1]}`}>
                {icon}
            </div>
            <span className="text-xs font-medium text-gray-700">{label}</span>
        </div>
    );
}

const SavedWorkflowsList = () => {
    const [savedWorkflows, setSavedWorkflows] = React.useState<SavedWorkflow[]>([]);
    // We can't use useWorkflow here if Sidebar is outside provider, but it is inside.
    // However, to avoid circular dependency issues if useWorkflow is not exported from here, 
    // we'll assume Sidebar is inside WorkflowProvider.
    // But wait, Sidebar imports useWorkflow? No, it doesn't currently.
    // Let's check imports. Sidebar doesn't import useWorkflow.
    // We need to import it.

    const loadWorkflows = () => {
        const workflows = JSON.parse(localStorage.getItem('saved-workflows') || '[]');
        setSavedWorkflows(workflows);
    };

    React.useEffect(() => {
        loadWorkflows();
        window.addEventListener('workflowSaved', loadWorkflows);
        return () => window.removeEventListener('workflowSaved', loadWorkflows);
    }, []);

    const load = (name: string) => {
        // We need access to loadWorkflow from context.
        // Since we can't easily change the Sidebar signature to accept props without changing App.tsx,
        // we will dispatch an event or use context if we import it.
        // Let's try to import useWorkflow.
        window.dispatchEvent(new CustomEvent('loadWorkflow', { detail: name }));
    };

    const deleteWorkflow = (name: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm(`Delete workflow "${name}"?`)) {
            const workflows = savedWorkflows.filter(w => w.name !== name);
            localStorage.setItem('saved-workflows', JSON.stringify(workflows));
            setSavedWorkflows(workflows);
        }
    };

    if (savedWorkflows.length === 0) {
        return <div className="px-6 text-xs text-gray-400 italic">No saved workflows</div>;
    }

    return (
        <div className="px-4 space-y-2">
            {savedWorkflows.map((w, i) => (
                <div
                    key={i}
                    onClick={() => load(w.name)}
                    className="flex items-center justify-between p-2 border border-gray-100 rounded-md hover:bg-gray-50 cursor-pointer group"
                >
                    <div className="flex items-center overflow-hidden">
                        <div className="w-2 h-2 rounded-full bg-gray-300 mr-2"></div>
                        <span className="text-xs font-medium text-gray-600 truncate">{w.name}</span>
                    </div>
                    <button
                        onClick={(e) => deleteWorkflow(w.name, e)}
                        className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
