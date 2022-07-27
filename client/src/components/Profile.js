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
  const [imageURL, setImageURL] = useState('')

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
    
  const handleFileUpload = e => {
    const uploadData = new FormData();
 
    uploadData.append("imageURL", e.target.files[0]);
 
    axios.post('/api/profile/upload', uploadData)
      .then(response => {
       console.log(response)
        setImageURL(response.data.secure_url);
    
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const requestBody = {imageURL, id}
    axios.post('/api/profile/savepicture', requestBody)
    .then(response => {
      console.log(response)
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
    <h2>Welcome {user?.name} 🙌 </h2>
    <br/>
    {imageURL ? <img src={imageURL} height='150px' /> : userDetails.imageURL ? <img src={userDetails.imageURL} height='150px' /> : <CgProfile size={'150px'} className='profile-icon' />}
    <br />
    <form onSubmit={handleSubmit} >
    <input type="file" onChange={(e) => handleFileUpload(e)} />
    {imageURL && <button>Save</button>}
    </form>
    <Link to={popupTopic} onClick={popupTopic}><h3>Create a Topic</h3></Link>
						{isCreateTopic && <CreateATopic handleClose={popupTopic}	/>}
    <br />
    <h3>List of entries</h3>
    <>
      {userDetails?.entries?.map((entry, i) => (
        <div key={entry?._id}>
        {userDetails?.entries[i-1]?.topic._id !== userDetails?.entries[i]?.topic._id && <Link to={`/topic/${entry.topic._id}`} ><h4>{entry?.topic?.title}</h4></Link>}
        {/* to show entries from one topic under only one topic and avoid showing the same topic multiple times */}
        <p>{entry.entry}</p> 
        </div>
      )
        )}
    </>
    </div>
    
  )
}
