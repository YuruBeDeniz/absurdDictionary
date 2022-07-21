import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import axios from 'axios'

export default function Profile() {
  const params = useParams();
  const id = params.id;

  const { user } = useContext(AuthContext);
  //console.log(user)

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
	/* const [entry, setEntry] = useState(''); */

  const handleSubmit = event => {
    event.preventDefault();
    const requestBody = {title}
    axios.post(`/api/topic/`, requestBody)
    .then (response => {
      //console.log(response)
      setTitle(title);
      /* setEntry(entry); */
      const topicID = response.data.newTopic._id
      navigate(`/topic/${topicID}`)
    })
  }

  const handleTitle = e => setTitle(e.target.value)
	/* const handleEntry = e => setEntry(e.target.value) */


  return (
    <div>
    <h2>Hello {user?.name} 🙌 </h2>
    <br />
    <form onSubmit = {handleSubmit}>
      <label><h3>Create a topic 👇</h3></label>
      <label>Title:</label>
      <input type='text' value={title} onChange={handleTitle} />
      <br />
      {/* <label>Entry:</label>
      <input type='text' value={name} onChange={handleEntry} />
      <br /> */}
      <button>Create a topic</button>
    </form>
    <br />
    <h3>List of entries</h3>
    </div>
    
  )
}
