import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
  const [search, setSearch] = useState('');
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    if(search){
      axios.get(`/api/topic/gettopics?q=${search}`)
      .then((response) => {
        setTopics(response.data.filteredTopics)
      })
      .catch(err => console.log(err))
    } else {
      axios.get('/api/topic/randomtopics')
      .then((response) => {
        setTopics(response.data.randomTopics)
      })
      .catch(err => console.log(err))
    }
  }, [search])



  const handleSearch = event => {
   setSearch(event.target.value)
  }



  return (
    <div>
    <div className='search-bar' >
    	<input value={search} onChange={handleSearch} type='text' placeholder='search for a topic'/>
    </div>
    {topics.map(topic => ( 
        < div key={topic?._id}>
        <Link to={`topic/${topic?._id}`}><h4>{topic?.title}</h4></Link>
        </div>
    ))}
    </div>
  )
}
