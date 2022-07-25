import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import CreateAnEntry from '../components/CreateAnEntry';
import Entry from '../components/Entry';
import { AuthContext } from '../context/auth';

export default function Topic() {
    const params = useParams();
    const id = params.id;

    const { isLoggedIn } = useContext(AuthContext);
      
    const [topic, setTopic] = useState('');
    const [entries, setEntries] = useState([]);
     

    useEffect(() => {
        axios.get(`/api/topic/details/${id}`)
        .then(response => {
           console.log(response)
            setTopic(response?.data?.topic)
            setEntries(response?.data?.topic?.entries)
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <div className='topicTitle'>
        <div ><h2>{topic?.title}</h2></div>
        {entries.map(entry => (
          <Entry key={entry?._id} entry={entry} />
        ))}
        {isLoggedIn ?
          <CreateAnEntry setEntriesProps={setEntries} entriesProps={entries} /> : '' }
           
        
    </div>
  )
}
