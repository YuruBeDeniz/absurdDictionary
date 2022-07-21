import '../App.css'
import React from 'react';
import { Link } from 'react-router-dom';
import campingPic from '../assets/camping-logo.png';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';


export default function Navbar() {
	const { isLoggedIn, logoutUser, user } = useContext(AuthContext);
	

	return (
		<div>
		<img src={campingPic} height='80' alt='homepic' className='logo'/>
			<ul className='navBar'>
				
            	<Link to='/'><button>Home</button></Link>
				
				{isLoggedIn && (
				<>	
                <button><Link to={`/profile/${user._id}`}>My Profile</Link></button>
				<button onClick={logoutUser}>Logout</button>
				</>
				)}

                {!isLoggedIn && (
				<>	
                	<Link to='/signup'><button>Signup</button></Link>
                    <Link to='/login'><button>Login </button></Link>
				 </> 
				)}
			</ul>
		</div>
	)
}