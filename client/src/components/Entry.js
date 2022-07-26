import React, { useContext } from 'react';
import '../App.css'
import { AuthContext } from '../context/auth';
import { Link } from 'react-router-dom';


export default function Entry(props) {
    const { user, isLoggedIn } = useContext(AuthContext);
    /* console.log(props.entry)
    console.log(user._id) */
    console.log(user._id)

  return (
    <div className='entryBox'>
     <p>{props.entry.entry}</p>
    <div className='nameAndDate'>
    <Link to={`/profile/${props.entry.author?._id}`}>{props.entry.author?.name}</Link>
    <p>{props.entry.createdAt.slice(0, 10)} {props.entry.createdAt.slice(11, 16)}</p>
     <>
      <Link to={`/entry/edit/${props.entry._id}`} >Edit</Link>
    </> 
    </div>
    </div>
  )
}
