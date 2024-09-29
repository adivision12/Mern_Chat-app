import React, { createContext, useContext, useEffect, useState } from 'react';
// import {useHistory} from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const initialUserState = localStorage.getItem("userInfo");
    const [authUser, setAuthUser] = useState(initialUserState ? JSON.parse(initialUserState) : undefined);

    return (
        <AuthContext.Provider value={[ authUser, setAuthUser ]}>
            {children}
        </AuthContext.Provider>
        
    )
}
 
export const useAuth = () => useContext(AuthContext);
