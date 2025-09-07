import { useState, createContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const history = useHistory()
    const [token, setToken] = useState(null);
    const [logInTime, setLogInTime] = useState(null);
    const [expiryTime, setExpiryTime] = useState(null);
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);
    
    function TimerLogOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('expiryTime');
        localStorage.removeItem('token');
        setToken(null);
        history.replace('/');
    }
    useEffect(() => {
        const savedExpiry = localStorage.getItem("expiryTime");
        if (savedExpiry) setExpiryTime(Number(savedExpiry));
        const interval = setInterval(() => {
            if (expiryTime && Date.now() >= expiryTime) {
                TimerLogOut();
            }
        }, 1000 * 5); 
        return () => clearInterval(interval);
    }, [expiryTime]);
    return (
        <AuthContext.Provider value={{ token, setToken, logInTime, setLogInTime, expiryTime, setExpiryTime, TimerLogOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };