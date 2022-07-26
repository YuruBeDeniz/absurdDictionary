import React, { useState } from 'react';
import axios from 'axios'; 
import { useParams } from 'react-router-dom';

export default function CreateAnEntry(props) {
  const [entry, setEntry] = useState('');

  const params = useParams();
  const id = params.id;

  const handleSubmit = event => {
    event.preventDefault();
    const storedToken = localStorage.getItem('authToken');
    const requestBody = {entry, topicId: id};
    axios.post('/api/entry', requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(response => {
      console.log(response.data)
      props.setEntriesProps([...props.entriesProps, response.data])
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleEntry = event => setEntry(event.target.value)

  return (
    <div className='createEntry'>
    <form onSubmit = {handleSubmit}>
        <label>Add an entry</label>
        <input type='text' value={entry} onChange={handleEntry} />
        <br />
        <button>Enter</button>
    </form>
    </div>
  )
}
