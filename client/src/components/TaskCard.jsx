import { useState } from 'react';
import { Trash, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

import API from '../services/api';

//assigning colours for priority
const priorityColors = {
    Low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

//status icons for task status
const statusIcon = (task) => {
    if (task.completed) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (new Date(task.dueDate) < new Date()) return <AlertCircle className="w-4 h-4 text-red-500" />;
    return <Clock className="w-4 h-4 text-yellow-500" />;
};

const TaskCard = ({ task, onDelete }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = async () => {
        try {
            await API.delete(`/tasks/${task._id}`);
            onDelete();
        } catch (err) {
            console.error('Failed to delete task:', err);
        } finally {
            setShowConfirm(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition"
        >
            <div className="flex justify-between items-center mb-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h2>
            </div>
            <p className="flex gap-1 text-sm text-gray-600 dark:text-gray-300 mb-1">
                {statusIcon(task)}{task.completed ? `Completed` : `Pending`}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Category: {task.category}</p>
            {task.priority && (
                <span className={`inline-block px-2 py-1 text-xs rounded ${priorityColors[task.priority] || ''} mb-1`}>
                    {task.priority} Priority
                </span>
            )}
            {task.dueDate && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
            )}

            <button
                onClick={(e) => {
                    e.stopPropagation(); 
                    setShowConfirm(true);
                }}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                title="Delete task"
            >
                <Trash className="w-4 h-4" />
            </button>

            {showConfirm && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10 rounded-xl">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg w-64 text-center">
                        <p className="mb-4 text-sm text-gray-800 dark:text-white">Are you sure you want to delete this task?</p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete();}}
                                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                            >
                                Yes
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setShowConfirm(false);}}
                                className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-1 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default TaskCard;
