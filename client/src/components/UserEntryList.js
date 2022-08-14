import React from 'react';
import { Link } from 'react-router-dom';

export default function UserEntryList(props) {

  return (
    <div>
        <h3>List of entries</h3>
    <>
      {props.userDetails?.entries?.map((entry, i) => (
        <div key={entry?._id}>
        {props.userDetails?.entries[i-1]?.topic._id !== props.userDetails?.entries[i]?.topic._id && <Link to={`/topic/${entry.topic._id}`} ><h4>{entry?.topic?.title}</h4></Link>}
        <p>{entry.entry}</p> 
        </div>
      )
        )}
     </>   
    </div>
  )
}
