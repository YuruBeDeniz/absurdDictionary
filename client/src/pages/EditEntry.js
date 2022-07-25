import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

export default function Edit() {
    const { id } = useParams();
    const { user, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const [entry, setEntry] = useState('')

    useEffect(() => {
        axios.get(`/api/entry/${id}`)
        .then(response => {
          const {entry} = response.data;
          setEntry(entry);
        })
        .catch(err => console.log(err));
    }, [])

    const handleSubmit = event => {
      event.preventDefault();
      const requestBody = {entry};
      axios.put(`/api/entry/${id}`, requestBody)
      .then(() => {
        navigate('/');
      })
      .catch(err => console.log(err));
    }

    const deleteEntry = () => {
      axios.delete(`/api/entry/${id}`)
        .then(() => {
          navigate('/')
        })
        .catch(err => console.log(err))
      }    

    const handleEntry = event => setEntry(event.target.value)

  return (
    <>
    {isLoggedIn ? 
      <>
    <h3>Edit the entry</h3>
    <div className='editEntry'>
    <form onSubmit={handleSubmit}>
        <input type='text' value={entry} onChange={handleEntry} />
        <br />
        <button type='submit'>Update the entry</button>
    </form>
    <button onClick={deleteEntry}>Delete this entry ❌</button>
    </div>
    </> : ''
    }
    </>
  )
}
