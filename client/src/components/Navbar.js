import '../App.css'
import React from 'react';
import { Link } from 'react-router-dom';
import campingPic from '../assets/camping-logo.png';

export default function Navbar() {
	return (
		<div>
			<ul className='navBar'>
                <img src={campingPic} height='80' alt='homepic' />
                <li>
                    <Link to='/'>Home</Link>
				</li>
				<li>
                    <Link to='/signup'>Signup</Link>
				</li>
			</ul>
		</div>
	)
}