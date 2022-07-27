import React, { useContext } from 'react';
import '../App.css'
import { AuthContext } from '../context/auth';
import { Link } from 'react-router-dom';


export default function Entry(props) {
    const { user, isLoggedIn, isLoading } = useContext(AuthContext);
    //console.log(props.entry)
    //console.log(user._id)
    
    const date = new Date(props.entry.createdAt).toLocaleString()

  return (
    <div className='entryBox'>
     <p>{props.entry.entry}</p>
    <div className='nameAndDate'>
    <Link to={`/profile/${props.entry.author?._id}`}>{props.entry.author?.name}</Link>
    <p>{date}</p>
     
     <>
     {!isLoading && isLoggedIn && (user._id === props.entry.author?._id) ? <Link to={`/entry/edit/${props.entry._id}`} >Edit</Link> : ''}
      
    </> 
    </div>
    </div>
  )
}
