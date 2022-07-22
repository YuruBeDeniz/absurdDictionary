import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';


export default function Entry(props) {
    const { user } = useContext(AuthContext);
    console.log(props.entry)
  return (
    <div>
    <p>{props.entry.entry}</p>
    <br />
    <p>{user.name}</p>
    </div>
  )
}
