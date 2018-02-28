import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'








class User extends React.Component {


    state={
      
      user: {}

    }

    componentDidMount = () => {
     

      axios({method: 'get', url: `/api/users/${this.props.user._id}`  
    }).then((res) => { this.setState({
      user: res.data
       })   
       console.log('Check user Data:::', this.state.user)
        }
      
      ) //end AXIOS



      console.log('Current User-client side::', this.state.user)
    

        }// END DID MOUNT





    render() {

      
  



        return (
          <div className="User">
  
            
            <h1>The USER SHOW Page</h1>
              <img src={this.state.user.user_imageURL} />
              <h3>{this.state.user.name}</h3>
              <h3>{this.state.user.email}</h3>
              <br/>
              <h3>{this.state.user.user_PhNumber}</h3>
              <h3>{this.state.user.user_department}</h3>
              <h3>{this.state.user.user_division}</h3>
              <h3>{this.state.user.user_divisionPhone}</h3>
              <br/>
              <h3>{this.state.user.user_supervisor}</h3>
              
              <br/>
              <br/> 
          <Link to={`/api/user-edit/${this.props.user._id}`}>Edit your Profile</Link> 

          </div>
        ) //end return
      
  
  
   
  
  
  
  
  
      
      } //END RENDER
  
      
     } //end CLASS
    
  
    export default User;
    