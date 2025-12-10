import React from 'react';
import { Search, Plus, MoreHorizontal, Link, ClipboardList, Zap, CheckCircle } from 'lucide-react';

const PerformancePanel = () => {
    return (
        <div className="flex flex-col h-full bg-white font-sans">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">Performance Overview</h2>
                <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Insight Metrics */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-semibold text-gray-700">Insight Metrics</h3>
                        <button className="text-gray-400 hover:text-gray-600"><Plus size={16} /></button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search Here..."
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">⌘</span>
                    </div>
                </div>

                {/* Automation Coverage */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium text-gray-800">Automation Coverage</h4>
                        <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={14} /></button>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Your last week is better 72%</p>
                    {/* Placeholder Chart */}
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-3/4"></div>
                    </div>
                </div>

                {/* Workflow A */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium text-gray-800">Workflow A</h4>
                        <button className="text-gray-400 hover:text-gray-600"><Plus size={14} /></button>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Triggered by User Actions</p>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-green-500 w-2/3"></div>
                    </div>
                    <div className="flex space-x-2">
                        <Badge label="Task: 29" color="red" />
                        <Badge label="Exec: 10" color="blue" />
                        <Badge label="Done: 13" color="green" />
                    </div>
                </div>

                {/* Workflow B */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium text-gray-800">Workflow B</h4>
                        <button className="text-gray-400 hover:text-gray-600"><Plus size={14} /></button>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Scheduled Automation</p>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-green-500 w-1/2"></div>
                    </div>
                    <div className="flex space-x-2">
                        <Badge label="Task: 10" color="red" />
                        <Badge label="Exec: 33" color="blue" />
                        <Badge label="Done: 17" color="green" />
                    </div>
                </div>

                {/* Flow Objectives */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-semibold text-gray-700">Flow Objectives</h3>
                        <button className="text-gray-400 hover:text-gray-600"><Plus size={16} /></button>
                    </div>
                    <div className="space-y-3">
                        <FlowObjectiveItem
                            icon={<Link size={16} />}
                            title="Output Generation"
                            subtitle="Compiling Delivering Outputs"
                        />
                        <FlowObjectiveItem
                            icon={<ClipboardList size={16} />}
                            title="Lorem Ipsum"
                            subtitle="Lorem Ipsum Sit Dolor"
                        />
                        <FlowObjectiveItem
                            icon={<Zap size={16} />}
                            title="Action Trigger"
                            subtitle="Performing Tasks Conditions"
                        />
                        <FlowObjectiveItem
                            icon={<CheckCircle size={16} />}
                            title="Data Validation"
                            subtitle="Ensuring Data Accuracy"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Badge = ({ label, color }: { label: string, color: 'red' | 'blue' | 'green' }) => {
    const colors = {
        red: 'bg-red-50 text-red-600 border-red-200',
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        green: 'bg-green-50 text-green-600 border-green-200',
    };
    return (
        <span className={`text-[10px] px-2 py-0.5 rounded border ${colors[color]} font-medium`}>
            {label}
        </span>
    );
};

const FlowObjectiveItem = ({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex items-start">
        <div className="mt-1 mr-3 text-gray-500">{icon}</div>
        <div className="flex-1">
            <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-800">{title}</h4>
                <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={14} /></button>
            </div>
            <p className="text-xs text-gray-500 mb-2">{subtitle}</p>
            <div className="flex space-x-3 text-xs text-gray-500 font-medium">
                <span className="flex items-center"><span className="mr-1">🚀</span> 15</span>
                <span className="flex items-center"><span className="mr-1">⏱️</span> 55</span>
                <span className="flex items-center text-green-600"><span className="mr-1">✅</span> 41</span>
                <span className="flex items-center text-purple-600"><span className="mr-1">⚡</span> 69</span>
            </div>
        </div>
    </div>
);

export default PerformancePanel;
