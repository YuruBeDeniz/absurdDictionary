import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import CreateATopic from './CreateATopic';
import axios from 'axios';
import { CgProfile } from 'react-icons/cg'


export default function Profile() {
  const params = useParams();
  const id = params.id;

  const [userDetails, setUserDetails] = useState('');

  const { user } = useContext(AuthContext);
  //console.log(user)
  const [isCreateTopic, setIsCreateTopic] = useState(false)

	const popupTopic = () => {
		setIsCreateTopic(!isCreateTopic);
	  }


  useEffect(() => {
    axios.get(`/api/profile/details/${id}`)
    .then((response) => {
      console.log(response.data)
      setUserDetails(response.data.user)
    })
    .catch(err => {
      console.log(err);
  })
  }, [])
    



  return (
    <div>
    <h2>Welcome {user?.name} 🙌 </h2>
    <br/>
    <CgProfile size={'150px'} className='profile-icon' />
    <br />
    <form enctype='multipart/form-data'>
    <input type='file' name='profile-image' />
    </form>
    <Link to={popupTopic} onClick={popupTopic}><h3>Create a Topic</h3></Link>
						{isCreateTopic && <CreateATopic handleClose={popupTopic}	/>}
    <br />
    <h3>List of entries</h3>
    <>
      {userDetails?.entries?.map((entry, i) => (
        <>
        <div key={entry?._id}>
        {userDetails?.entries[i-1]?.topic._id !== userDetails?.entries[i]?.topic._id && <Link to={`/topic/${entry.topic._id}`} ><h4>{entry?.topic?.title}</h4></Link>}
        {/* to show entries from one topic under only one topic and avoid showing the same topic multiple times */}
        </div>
        <p>{entry.entry}</p> 
        
        </>
      )
        )}
    </>
    </div>
    
  )
}
