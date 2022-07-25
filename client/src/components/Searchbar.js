/* import React, { useState } from 'react';


export default function Searchbar({topics, setTopics}) {
  console.log(topics)
   const [search, setSearch] = useState(topics);
	 
   const filteredSearch = topics.filter(topic => {
    //console.log(topic)
	 if(topic.title.includes(search)){
		return true
	}
	setTopics(filteredSearch)
   })
	
	const handleSearch = event => setSearch(event.target)

  return (
    <div className='searchBar' >
    	<input onChange={handleSearch} type='text' placeholder='search for a topic'/>
    </div>
  )
}
 */