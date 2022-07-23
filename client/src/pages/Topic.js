import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateAnEntry from '../components/CreateAnEntry';
import Entry from '../components/Entry';

export default function Topic() {
    const params = useParams();
    const id = params.id;
       
    const [topic, setTopic] = useState('');
    const [entries, setEntries] = useState([]);
     

    useEffect(() => {
        axios.get(`/api/topic/${id}`)
        .then(response => {
           // console.log(response)
            setTopic(response.data.topic)
            setEntries(response.data.topic.entries)
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <div className='topicTitle'>
        <div ><h2>{topic?.title}</h2></div>
        {entries.map(entry => (
          <Entry key={entry._id} entry={entry} />
        ))}
        <CreateAnEntry setEntriesProps={setEntries} entriesProps={entries} />
    </div>
  )
}
