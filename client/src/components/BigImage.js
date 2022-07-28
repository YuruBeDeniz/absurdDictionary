import React from 'react';
import '../App.css'
import { CgProfile } from 'react-icons/cg';

export default function BigImage(props) {
  return (
    <div className='big-image'>
    {props.imageURL? <img src={props.imageURL} height='150px' alt='profilePicture' /> : <CgProfile size={'150px'} className='profile-icon' />}
    </div>
  )
}
