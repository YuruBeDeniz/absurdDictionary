import React, { useState } from 'react';
import { Link } from 'react-router-dom';
/* import Searchbar from './Searchbar'; */

export default function Home({topics, setTopics}) {
  //console.log(topics)
  const [search, setSearch] = useState('');
	 
  const filteredSearch = topics.filter(topic => {
   //console.log(topic)
  if(topic.title.toLowerCase().includes(search.toLowerCase())){
   return true
 }
 /* setTopics(filteredSearch) */
  })
  //console.log(filteredSearch)
 
 const handleSearch = event => {
  //console.log(event.target.value)
  setSearch(event.target.value)
}
  return (
    <div>
    {/* <Searchbar topics={topics} setTopics={setTopics} /> */}
    <div className='searchBar' >
    	<input value={search} onChange={handleSearch} type='text' placeholder='search for a topic'/>
    </div>
    {filteredSearch.map(topic => ( 
        < div key={topic._id}>
        <Link to={`topic/${topic._id}`}><h4>{topic?.title}</h4></Link>
        {/* <p>{topic.entries[0]}</p> */}
        </div>
    ))}
    </div>
  )
}
