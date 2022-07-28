import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

export default function EditTopic() {
    const { id } = useParams();
    const { user, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');

    console.log(user._id)

    useEffect(() => {
        axios.get(`/api/topic/details/${id}`)
        .then((response) => {
            console.log(response.data.topic)
            const {title} = response.data.topic;
            setTitle(title);
        })
        .catch(err => console.log(err));
    },[])

    const handleSubmit = event => {
        const storedToken = localStorage.getItem('authToken')
        event.preventDefault();
        const requestBody = {title};
        axios.put(`/api/topic/${id}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(() => {
          navigate(`/topic/${id}`);
        })
        .catch(err => console.log(err));
      }

    const handleTitle = event => setTitle(event.target.value)

  return (
    <>
    {isLoggedIn ? 
      <>
    <h3>Edit the topic</h3>
    <div className='edit-topic'>
    <form onSubmit={handleSubmit}>
        <input type='text' value={title} onChange={handleTitle} />
        <br />
        <button type='submit'>Update the topic</button>
    </form>
    </div>
    </> : ''
    }
    </>
  )
}
