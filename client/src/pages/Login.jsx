import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!form.email || !form.password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const res = await API.post('/auth/login', form);
            login(res.data.token, res.data.user);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-sm"
            >
                <h2 className="text-3xl text-gray-800 dark:text-white mb-6">
                    Login
                </h2>

                {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

                <div className="mb-4">
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
                >
                    Login
                </button>

                <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
                    Don’t have an account?{' '}
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
