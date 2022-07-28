import React, { useContext } from 'react';
import '../App.css'
import { AuthContext } from '../context/auth';
import { Link } from 'react-router-dom';
import SmallImage from './SmallImage';


export default function Entry(props) {
    const { user, isLoggedIn, isLoading } = useContext(AuthContext);
    //console.log(props.entry)
    //console.log(user)
    
    const date = new Date(props.entry.createdAt).toLocaleString()

  return (
    <div className='entry-box'>
     <p>{props.entry.entry}</p>
    <div className='nameAndDate'>
    <SmallImage imageURL={props.entry.author?.imageURL} />
    <Link to={`/profile/${props.entry.author?._id}`}>{props.entry.author?.name}</Link>
    <p>{date}</p>
     
     <>
     {!isLoading && isLoggedIn && (user._id === props.entry.author?._id) ? <Link to={`/entry/edit/${props.entry._id}`} >Edit</Link> : ''}
      
    </> 
    </div>
    </div>
  )
}
