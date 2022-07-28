import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import BigImage from './BigImage';


export default function UploadImage(props) {
    const params = useParams();
    const id = params.id;


    const [imageURL, setImageURL] = useState('')

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
          setImageURL('')
        })
        .catch(err => console.log(err));
      }

  return (
    <div>
        {imageURL ? <BigImage imageURL={imageURL} /> : props.userDetails?.imageURL ? <img src={props.userDetails?.imageURL} height='150px' alt='profilePicture' /> : <CgProfile size={'150px'} className='profile-icon' />}
    <br />
    <form onSubmit={handleSubmit} >
    <input type="file" onChange={(e) => handleFileUpload(e)} />
    {imageURL && <button>Save</button>}
    </form>
    </div>
  )
}
