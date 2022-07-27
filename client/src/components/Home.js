import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
/* import Searchbar from './Searchbar'; */

export default function Home() {
  //console.log(topics)
  const [search, setSearch] = useState('');
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    if(search){
      axios.get(`/api/topic/gettopics?q=${search}`)
      .then((response) => {
        console.log(response.data)
        setTopics(response.data.filteredTopics)
      })
      .catch(err => console.log(err))
    } else {
      //if there is no search:
      axios.get('/api/topic/randomtopics')
      .then((response) => {
        setTopics(response.data.randomTopics)
      })
      .catch(err => console.log(err))
    }
  }, [search])
  //when search changes useEffect runs axios.get again



  const handleSearch = event => {
   //console.log(event.target.value)
   setSearch(event.target.value)
   //console.log(search)
  }



  return (
    <div>
    {/* <Searchbar topics={topics} setTopics={setTopics} /> */}
    <div className='searchBar' >
    	<input value={search} onChange={handleSearch} type='text' placeholder='search for a topic'/>
    </div>
    {topics.map(topic => ( 
        < div key={topic?._id}>
        <Link to={`topic/${topic?._id}`}><h4>{topic?.title}</h4></Link>
        {/* <p>{topic.entries[0]}</p> */}
        </div>
    ))}
    </div>
  )
}
