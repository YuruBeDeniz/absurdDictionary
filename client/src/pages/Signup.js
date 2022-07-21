import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    const requestBody = {email, password, name}
    axios.post('/api/auth/signup', requestBody)
    .then(response => {
      navigate('/login');
    })
    .catch(err => {
      const errorDescription = err.response.data.message;
      setErrorMessage(errorDescription)
    })
  }

  const handleEmail = e => setEmail(e.target.value)
	const handleName = e => setName(e.target.value)
	const handlePassword = e => setPassword(e.target.value)


  return (
  <>  
    <h1>Signup</h1>
    <form onSubmit={handleSubmit} >
      <label>Email:</label>
      <input value={email} type='text' onChange={handleEmail} />
      <br />
      <label>Name:</label>
      <input value={name} type='text' onChange={handleName} />
      <br />
      <label>Password:</label>
      <input value={password} type='password' onChange={handlePassword} />
      <br />
      <button type="submit">Sign Up</button>
    </form>

    {errorMessage && <h5>{errorMessage}</h5>}

    <h3>Already have an account?</h3>
    <Link to='/login'>Login</Link>
  </>  
  )
}
