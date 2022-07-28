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
        {/* to show entries from one topic under only one topic and avoid showing the same topic multiple times */}
        <p>{entry.entry}</p> 
        </div>
      )
        )}
     </>   
    </div>
  )
}
