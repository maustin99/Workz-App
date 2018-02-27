import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'








class User extends React.Component {


    state={
      
      user: {}

    }

    componentDidMount = () => {
     
      this.setState({
        user: this.props.user
        
      })


      console.log('Current User-client side::', this.state.user)
    

        }// END DID MOUNT





    render() {

      
  



        return (
          <div className="User">
  
            
            <h1>The USER SHOW Page</h1>
              <img src={this.props.user.user_imageURL} />
              <h3>{this.props.user.name}</h3>
              <h3>{this.props.user.email}</h3>
              <br/>
              <h3>{this.props.user.user_PhNumber}</h3>
              <h3>{this.props.user.user_department}</h3>
              <h3>{this.props.user.user_division}</h3>
              <h3>{this.props.user.user_divisionPhone}</h3>
              <br/>
              <h3>{this.props.user.user_supervisor}</h3>
              
              <br/>
              <br/> 
          <Link to={`/api/user-edit/${this.props.user._id}`}>Edit your Profile</Link> 

          </div>
        ) //end return
      
  
  
   
  
  
  
  
  
      
      } //END RENDER
  
      
     } //end CLASS
    
  
    export default User;
    