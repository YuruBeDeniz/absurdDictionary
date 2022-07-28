import '../App.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';


export default function Navbar() {
	const { isLoggedIn, logoutUser, user } = useContext(AuthContext);


	return (
	<div>

	  <div className='nav-bar'>	
	    <div className='nav-bar-heading'>
		  <h1>Absurd Dictionary</h1>
    	  <p>Spiky source of information</p>
		</div>
		<div className='nav-bar-buttons'>
        <Link to='/'><button>Home</button></Link>
		
		{isLoggedIn && (
		<>	
        <Link to={`/profile/${user._id}`}><button>My Profile</button></Link>
		<button onClick={logoutUser}>Logout</button>
		</>
		)}
        {!isLoggedIn && (
		<>	
        	<Link to='/signup'><button>Signup</button></Link>
            <Link to='/login'><button>Login </button></Link>
		 </> 
		)}
		</div>
	  </div>
	</div>
	)
}