import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="text-center">
                <AlertTriangle className="mx-auto w-16 h-16 text-yellow-500 mb-4" />
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">404 - Page Not Found</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
