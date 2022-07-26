import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateATopic(props) {
  const [title, setTitle] = useState('');

  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault();
    const requestBody = {title}
    const storedToken = localStorage.getItem('authToken');
    axios.post(`/api/topic/`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then (response => {
      //console.log(response)
      setTitle(title);
      /* setEntry(entry); */
      const topicID = response.data.newTopic._id
      navigate(`/topic/${topicID}`)
    })
    .catch(err => console.log(err))
  }

  const handleTitle = e => setTitle(e.target.value)
 


  return (
    <div className="popup-box">
    <div className="box">
      <span className="close-icon" onClick={props.handleClose}>x</span>
      <h2>Title your topic</h2>
      <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input type="text" value={title} onChange={handleTitle} />
          <br />
          <button type="submit">Add new topic</button>
      </form>
    </div>
  </div>
  )
}
