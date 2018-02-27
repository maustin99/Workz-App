import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'








class User extends React.Component {

    constructor(props){
        super(props)
       
    }

    state={
      
      user: {}

    }

    componentDidMount = () => {
     
      this.setState({
        user: this.props.user
        
      })

      console.log('Current User-client side::', this.state.user)
    

        }// END DID MOUNT

    
    handleFormChange(evt) {
        const fieldName = evt.target.name
        this.setState({
            user: {
                ...this.state.user,
                [evt.target.name]: evt.target.value
            }
        })
        }// end HandleForm


        updateUser(evt){
            evt.preventDefault()
            console.log('update button fired', this.state.user)
    
                axios({method: 'patch', url: `/api/users/${this.props.user._id}`, data: this.state.user 
            }).then((res) => {
                    this.props.history.push(`/api/user/${this.props.user._id}`)
                    this.props.updateDOM()
                    
                }) //end AXIOS
    
                
        }//END Update User

    render() {

      
  



        return (
          <div className="User">
  
            
            <h1>The USER EDIT Page</h1>

            <form onChange={this.handleFormChange.bind(this)} onSubmit={this.updateUser.bind(this)}>
          <input type="text" name="name" ref="problem" placeholder="Name" value={this.state.user.name} /><br/>
          <input type="text" name="email" ref="email" placeholder="Email" value={this.state.user.email} /><br/>
          <input type="text" name="user_PhNumber" ref="user_PhNumber" placeholder="Phone Number" value={this.state.user.user_PhNumber} /><br/>
          <input type="text" name="user_department" ref="user_department" placeholder="Department" value={this.state.user.user_department} /><br/>
          <input type="text" name="user_division" ref="user_division" placeholder="Division" value={this.state.user.user_division} /><br/>
          <input type="text" name="user_divisionPhone" ref="user_divisionPhone" placeholder="Division Phone Number" value={this.state.user.user_divisionPhone} /><br/>
          <input type="text" name="user_supervisor" ref="user_supervisor" placeholder="Supervisor" value={this.state.user.user_supervisor} /><br/>
          <input type="text" name="user_imageURL" ref="user_imageURL" placeholder="Profile Picture URL" value={this.state.user.user_imageURL} /><br/>
         
            <button>Update Profile</button>
        </form>


              <br/>
              <br/>
              <Link to={`/api/user/${this.props.user._id}`}>Return your Profile</Link>

          </div>
        ) //end return
      
  
  
   
  
  
  
  
  
      
      } //END RENDER
  
      
     } //end CLASS
    
  
    export default User;
    