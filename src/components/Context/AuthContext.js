import {useState, createContext} from 'react';

const AuthContext = createContext();

const AuthProvider = ({Children}) => {
    const [token, setToken] = useState("");
    return (
        <AuthContext.Provider value={{token, setToken}}>
            {Children}
        </AuthContext.Provider>
    );
}

export {AuthProvider, AuthContext};