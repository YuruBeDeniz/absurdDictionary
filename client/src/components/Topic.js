import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Topic() {
    const params = useParams();
    const id = params.id;
    console.log(params)
    
    
    const [topic, setTopic] = useState('');
    

    useEffect(() => {
        axios.get(`/api/topic/${id}`)
        .then(response => {
            setTopic(response.data)
        })
        .catch(err => console.log(err))
    })

  return (
    <div>
        <h2>{topic.title}</h2>
    </div>
  )
}
