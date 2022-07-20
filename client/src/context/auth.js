import { PromiseProvider } from 'mongoose';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5005";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{isLoggedIn, isLoading, user}} >
            {props.children}
        </AuthContext.Provider> 
    )

}



export { AuthProviderWrapper, AuthContext };