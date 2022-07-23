import React, { useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import TopicPopUp from './TopicPopUp';
/* import Topic from '../pages/Topic'; */


export default function Profile() {
  const params = useParams();
  const id = params.id;

  const { user } = useContext(AuthContext);
  //console.log(user)
  const [isCreateTopic, setIsCreateTopic] = useState(false)

	const popupTopic = () => {
		setIsCreateTopic(!isCreateTopic);
	  }



  return (
    <div>
    <h2>Hello {user?.name} 🙌 </h2>
    <br />
    <Link to={popupTopic} onClick={popupTopic} style={{ textDecoration: 'none' }}>Create a Topic</Link>
						{isCreateTopic && <TopicPopUp handleClose={popupTopic}	/>}
    <br />
    <h3>List of entries</h3>
    {/* <h5><Topic /></h5> */}
    <br />
    <h3>List of topics</h3>
    </div>
    
  )
}
