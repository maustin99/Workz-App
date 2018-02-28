import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
	 
	return (
		
		<div className='NavBar'>
			<span id="LogoText">ORDRZ</span>
            
	{/* <span>Welcome { props.currentUser.name }</span> */}
			<div id="NavMenu">
					<Link to="/"><p>Home</p></Link>
					{props.currentUser
						? (
							<span>
								<Link to="/api/orders-search"><p>Search Orders</p></Link>
								<Link to="/api/venues"><p>Venues</p></Link>
								<Link to={`/api/user/${props.currentUser._id}`} ><p>User Profile</p></Link>
								<Link to="/logout"><p>Log Out</p></Link>
							</span>
						)
						: (
							<span>
								<Link to="/login"><p>Log In</p></Link>
								<Link to="/signup"><p>Sign Up</p></Link>
							</span>
						)
					}
			</div> {/* END div nav menu */}
		</div> 

	)
}

export default NavBar