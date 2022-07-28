import React from 'react';
import '../App.css'
import { CgProfile } from 'react-icons/cg';

export default function SmallImage(props) {
  return (
    <div className='small-image'>
    {props.imageURL? <img src={props.imageURL} height='40px' alt='profilePicture' /> : <CgProfile size={'40px'} className='profile-icon' />}
    </div>
  )
}
