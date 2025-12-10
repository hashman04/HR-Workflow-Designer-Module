import React, { useState } from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import { simulateWorkflow, type SimulationLog } from '../api/mockApi';
import { PlayCircle, XCircle, Loader2 } from 'lucide-react';

const SimulationPanel = () => {
    const { nodes, edges, setExecutionStatus } = useWorkflow();
    const [logs, setLogs] = useState<SimulationLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState('Manager');

    const runSimulation = async () => {
        setIsOpen(true);
        setLoading(true);
        setLogs([]);
        setExecutionStatus({}); // Reset status

        try {
            const results = await simulateWorkflow(nodes, edges, currentRole, (log) => {
                setLogs((prev) => [...prev, log]);
                if (log.stepId !== 'error') {
                    setExecutionStatus((prev) => ({
                        ...prev,
                        [log.stepId]: log.status
                    }));
                }
            });
            setLogs(results);
        } catch (error) {
            console.error("Simulation failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="absolute bottom-4 left-4 z-10 flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md border border-gray-200">
                <select
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                    className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1.5 border outline-none"
                >
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                </select>
                <button
                    onClick={runSimulation}
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                    {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <PlayCircle className="mr-2" size={18} />}
                    Simulate
                </button>
            </div>

            {isOpen && (
                <div className="absolute bottom-0 left-0 w-full h-64 bg-white border-t border-gray-200 shadow-xl z-50 flex flex-col">
                    <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                        <h3 className="font-semibold text-gray-800">Simulation Logs</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                            <XCircle size={20} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {loading ? (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <Loader2 size={24} className="animate-spin mr-2" />
                                Running simulation...
                            </div>
                        ) : logs.length > 0 ? (
                            logs.map((log, index) => (
                                <div key={index} className={`p-2 rounded border ${log.status === 'success' ? 'bg-green-50 border-green-200 text-green-800' : log.status === 'failed' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-yellow-50 border-yellow-200 text-yellow-800'}`}>
                                    <div className="flex justify-between text-xs mb-1 opacity-75">
                                        <span>{log.timestamp}</span>
                                        <span className="uppercase font-bold">{log.status}</span>
                                    </div>
                                    <div className="font-medium">{log.nodeLabel}</div>
                                    <div className="text-sm">{log.message}</div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-400 text-center mt-4">No logs available.</div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default SimulationPanel;
