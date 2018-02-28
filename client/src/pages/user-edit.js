import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'
import clientAuth from './clientAuth'

class UserEdit extends React.Component {

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
            clientAuth.updateUser(this.props.user._id, this.state.user).then((updatedUser) => {
                this.props.history.push(`/api/user/${this.props.user._id}`)
                this.props.onUserUpdate(updatedUser)  //calls function in App.js to update user
            }) //end AXIOS
    
                
        }//END Update User

    render() {

      
  



        return (
          <div className="UserEdit">
  
            
            <h1>Profile Edit</h1>
                <div id="userEditSmallContainer">
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
                        <Link to={`/api/user/${this.props.user._id}`}><p>Return your Profile</p></Link>
                </div>
          </div>
        ) //end return
      
  
  
   
  
  
  
  
  
      
      } //END RENDER
  
      
     } //end CLASS
    
  
    export default UserEdit;
    