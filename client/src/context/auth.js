import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

	const navigate = useNavigate();

    const storeToken = token => {
		localStorage.setItem('authToken', token)
	};

    const verifyStoredToken = () => {
		const storedToken = localStorage.getItem('authToken')
		if (storedToken) {
			return axios.get(
                '/api/auth/verify',
				{ headers: { Authorization: `Bearer ${storedToken}` } }
			)
				.then(response => {
					const user = response.data
					setUser(user)
					setIsLoggedIn(true)
					setIsLoading(false)
				})
				.catch(err => {
					setUser(null)
					setIsLoggedIn(false)
					setIsLoading(false)
				})
		} else {
			setIsLoading(false)
		}
	}

	const logoutUser = () => {
		localStorage.removeItem('authToken')

		setUser(null)
		setIsLoggedIn(false)
		navigate('/')
	}

	useEffect(() => {
		verifyStoredToken()
	}, [])

    return (
        <AuthContext.Provider value={{isLoggedIn, isLoading, user, storeToken, verifyStoredToken, logoutUser}} >
            {props.children}
        </AuthContext.Provider> 
    )

}



export { AuthProviderWrapper, AuthContext };