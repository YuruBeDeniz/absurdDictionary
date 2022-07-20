import '../App.css'
import React from 'react';
import { Link } from 'react-router-dom';
import campingPic from '../assets/camping-logo.png';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';

export default function Navbar() {
	const { isLoggedIn, user } = useContext(AuthContext);

	return (
		<div>
		<img src={campingPic} height='80' alt='homepic' className='logo'/>
			<ul className='navBar'>
				{isLoggedIn && (
				<>	
                <li>
                    <Link to='/'>Home</Link>
				</li>
				</>
				)}

                {!isLoggedIn && (
				<>	
				 <li>
                	 <Link to='/signup'>Signup</Link>
				 </li>
				 <li>
                    <Link to='/login'>Login</Link>
				 </li>
				 </> 
				)}
			</ul>
		</div>
	)
}