import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
	return (
		<div className='NavBar'>
            <span>Welcome {props.currentUser.name}</span>
			<Link to="/">Home</Link>
			{props.currentUser
				? (
					<span>
						<Link to="/api/orders-search">Search Orders</Link>
                        <Link to="/api/venues">Venues</Link>
                        <Link to={`/api/user/${props.currentUser._id}`} >User Profile</Link>
						<Link to="/logout">Log Out</Link>
					</span>
				)
				: (
					<span>
						<Link to="/login">Log In</Link>
						<Link to="/signup">Sign Up</Link>
					</span>
				)
			}
		</div>
	)
}

export default NavBar