import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
//import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [stats, setStats] = useState(null);
    const [reminders, setReminders] = useState([]);

    const { logout, loggingOut, user } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggingOut && !user) {
            navigate('/');
        }
    }, [loggingOut, user]);

    const handleLogout = () => {
        logout();
    };

    //fetching the tasks
    const fetchTasks = async () => {
        try {
            const params = {};
            if (search) params.search = search;
            if (categoryFilter) params.category = categoryFilter;
            if (statusFilter) params.completed = statusFilter;
            const res = await API.get('/tasks', { params });
            setTasks(res.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        }
    };

    //fetching the stats
    const fetchStats = async () => {
        try {
            const res = await API.get('/tasks/dashboard');
            setStats(res.data);
        } catch (err) {
            console.error('Failed to load dashboard stats:', err);
        }
    };

    //notification reminder
    const fetchReminders = async () => {
        try {
            const res = await API.get('/tasks/reminders');
            setReminders(res.data);
        } catch (err) {
            console.error('Failed to fetch reminders:', err);
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchStats();
        fetchReminders();
    }, [search, categoryFilter, statusFilter]);

    const handleEdit = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleNewTask = () => {
        setEditingTask(null);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingTask(null);
        fetchTasks();
        fetchStats();
    };

    if (loggingOut) return <div className="flex items-center justify-center min-h-screen text-lg">Logging out...</div>;

    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
            {/* <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    Task Dashboard
                </h1>
                <div className="flex gap-2 items-center">
                    <ThemeToggle />
                    <button
                        onClick={onLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm transition"
                    >
                        Logout
                    </button>
                </div>
            </div> */}
            <Navbar onLogout={handleLogout} />

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
                <button
                    onClick={handleNewTask}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow self-start"
                >
                    + New Task
                </button>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border px-3 py-2 rounded dark:bg-gray-800 dark:text-white w-full sm:w-auto"
                    />
                    <input
                        type="text"
                        placeholder="Filter by category"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="border px-3 py-2 rounded dark:bg-gray-800 dark:text-white w-full sm:w-auto"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border px-3 py-2 rounded dark:bg-gray-800 dark:text-white w-full sm:w-auto"
                    >
                        <option value="">All</option>
                        <option value="true">Completed</option>
                        <option value="false">Pending</option>
                    </select>
                </div>
            </div>

            <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
                <TaskForm task={editingTask} onSuccess={handleFormSuccess} />
            </Modal>

            {stats && (
                <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="text-gray-800 dark:text-white">
                            <p className="text-sm">Total Tasks</p>
                            <p className="text-lg font-bold">{stats.totalTasks}</p>
                        </div>
                        <div className="text-gray-800 dark:text-white">
                            <p className="text-sm">Completed</p>
                            <p className="text-lg font-bold">{stats.completedTasks}</p>
                        </div>
                        <div className="text-gray-800 dark:text-white">
                            <p className="text-sm">Pending</p>
                            <p className="text-lg font-bold">{stats.pendingTasks}</p>
                        </div>
                    </div>
                </div>
            )}

            {reminders.length > 0 && (
                <div className="mb-6 bg-yellow-100 dark:bg-yellow-200 p-4 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">🔔 Reminders</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        {reminders.map((task) => (
                            <li key={task._id}>
                                <strong>{task.title}</strong> (due {new Date(task.dueDate).toLocaleDateString()})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {tasks.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300">No tasks available.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => (
                        <div key={task._id} onClick={() => handleEdit(task)} className="cursor-pointer">
                            <TaskCard task={task} onDelete={() => {
                                fetchTasks();
                                fetchStats();
                            }} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
