import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth';

export default function Login() {

    const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);
   

    const navigate = useNavigate();

    const { storeToken, verifyStoredToken, user } = useContext(AuthContext)

    const handleSubmit = e => {
        e.preventDefault();
        const requestBody = {name, password}
        axios.post('/api/auth/login', requestBody)
        .then(response => {
           // console.log(response.data)
           const token = response.data.authToken;
           const userId = response.data.userId
           console.log(token)
           // Save the token in the localStorage
           storeToken(token);
           // Verify the token by sending a request 
           // to the server's JWT validation endpoint.
           verifyStoredToken()
            .then(() => {
                navigate(`/profile/${userId}`);
            })        
        })
        .catch(err => {
            console.log(err)
            const errorDescription = err.response.data.message;
			setErrorMessage(errorDescription);
        })
    }

    const handleName = e => setName(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

  return (
    <>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>

        <label htmlFor="name">Name: </label>
        <input type="text" value={name} onChange={handleName} />

        <label htmlFor="password">Password: </label>
        <input type="password" value={password} onChange={handlePassword} />

        <button type="submit">Log In</button>
    </form>

    {errorMessage && <h5>{errorMessage}</h5>}

    <h3>Don't have an account?</h3>
    <Link to='/signup'>Signup</Link>
</>
  )
}
