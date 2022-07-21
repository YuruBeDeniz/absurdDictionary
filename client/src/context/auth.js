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
		// store this token in local storage
		localStorage.setItem('authToken', token)
	};

    const verifyStoredToken = () => {
		// check if we have a token in local storage
		const storedToken = localStorage.getItem('authToken')
		if (storedToken) {
			// if yes -> send it to the server to verify
			return axios.get(
                '/api/auth/verify',
				{ headers: { Authorization: `Bearer ${storedToken}` } }
                // We must send the JWT token in the request's "Authorization" Headers
			)
				.then(response => {
					// after verification set the user and set isLoggedIn
                    //console.log(response)
					const user = response.data
					setUser(user)
					setIsLoggedIn(true)
					setIsLoading(false)
				})
				.catch(err => {
					// the token is invalid
					setUser(null)
					setIsLoggedIn(false)
					setIsLoading(false)
				})
		} else {
			// there is no token in local storage
			setIsLoading(false)
		}
	}

	const logoutUser = () => {
		// remove the token from local storage
		localStorage.removeItem('authToken')
		// update the state
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