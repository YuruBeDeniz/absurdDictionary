import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import CreateATopic from './CreateATopic';
import axios from 'axios';
import UploadImage from './UploadImage';
import UserEntryList from './UserEntryList';
import Image from './SmallImage';


export default function Profile() {
  const params = useParams();
  const id = params.id;

  const { user, isLoggedIn } = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState('');
  const [isCreateTopic, setIsCreateTopic] = useState(false)

  
	const popupTopic = () => {
		setIsCreateTopic(!isCreateTopic);
	  }


  useEffect(() => {
    axios.get(`/api/profile/details/${id}`)
    .then((response) => {
      //console.log(response.data)
      setUserDetails(response.data.user)
    })
    .catch(err => {
      console.log(err);
  })
  }, [id])
  //if the params id changes, the data is reloaded


  //console.log('user: ', user)
  //console.log('userDetails:', userDetails)
    
  const isOwnProfile = isLoggedIn && (user._id === userDetails._id)

  return (
    <div>
    {isOwnProfile && <h2>Welcome {user?.name} 🙌 </h2>}
    <br/>
    {isOwnProfile ? <UploadImage userDetails={userDetails} /> : <div className='profile-picture'> <Image /> </div> }
    <br />
    {isOwnProfile && <Link to={popupTopic} onClick={popupTopic}><h3>Create a Topic</h3></Link>}
						{isCreateTopic &&  <CreateATopic handleClose={popupTopic}	/>}
    <br />
    <UserEntryList userDetails={userDetails} />
    </div>
    
  )
}
