import { useState, useEffect } from 'react';

import API from '../services/api';

const initialState = {
    title: '',
    category: '',
    completed: false,
    priority: 'Medium',
    dueDate: '',
};

const TaskForm = ({ task = null, onSuccess }) => {
    const [form, setForm] = useState(initialState);
    const [error, setError] = useState('');

    useEffect(() => {
        if (task) {
            setForm({
                title: task.title || '',
                category: task.category || '',
                completed: task.completed || false,
                priority: task.priority || 'Medium',
                dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (task?._id) {
                await API.put(`/tasks/${task._id}`, form);
            } else {
                await API.post('/tasks', form);
            }
            setForm(initialState);
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save task.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-md mb-6 max-w-xl mx-auto"
        >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                {task ? 'Edit Task' : 'Create New Task'}
            </h2>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="grid gap-4">
                <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={form.dueDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="completed"
                        checked={form.completed}
                        onChange={handleChange}
                        className="accent-blue-600"
                    />
                    <label className="text-sm text-gray-700 dark:text-gray-300">Mark as Completed</label>
                </div>
            </div>

            <button
                type="submit"
                className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition"
            >
                {task ? 'Update Task' : 'Create Task'}
            </button>
        </form>
    );
};

export default TaskForm;
