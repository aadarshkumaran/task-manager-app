import ThemeToggle from './ThemeToggle';

const Navbar = ({ onLogout }) => {
    return (
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Task Dashboard</h1>
            <div className="flex gap-3 items-center">
                <ThemeToggle />
                <button
                    onClick={onLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
