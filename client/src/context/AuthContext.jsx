import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');
        setUser(token ? { token } : null);
        setLoading(false);
    }, []);

    const login = (token,user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user)); // saves the user info
        setUser({ token });
    };
    

    const logout = () => {
        setLoggingOut(true);
        setTimeout(() => {
            localStorage.removeItem('token');
            setUser(null);
            setLoggingOut(false);
            navigate('/');
        }, 500); // 0.5s delay to show loading screen
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, loading, loggingOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
