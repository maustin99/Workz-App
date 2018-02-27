import React, { Component } from 'react';
import './App.css';
// import the axios module:
import axios from 'axios'
//import jwtDecode from 'jwt-decode'
import { Route, NavLink } from 'react-router-dom'

import NavBar from './pages/NavBar'
import Venues from './pages/venues.js';
import Venue from './pages/venue.js';
import VenueCreate from './pages/venue-create.js';
import VenueEdit from './pages/venue-edit.js';
import Orders from './pages/orders.js';
import Order from './pages/order.js';
import OrderCreate from './pages/order-create.js';
import OrderEdit from './pages/order-edit.js';
import OrderSearch from './pages/order-search.js';
  
import User from './pages/user.js';
import UserEdit from './pages/user-edit.js';

import clientAuth from './pages/clientAuth'
import LogIn from './pages/views/LogIn'
import LogOut from './pages/views/LogOut'
import SignUp from './pages/views/SignUp'
import Home from './pages/views/Home'

class App extends Component {
  state = {
      venues: [],

      currentUser: clientAuth.getCurrentUser()
    
  }

componentDidMount = () => {
console.log("mount")
// make a test API call:
axios({method: 'get', url: '/api/venues'})
  .then((res) => { this.setState({
    venues: res.data
  })
})

}//end DID MOUNT


updateDOM = () =>{
  axios({method: 'get', url: '/api/venues'})
    .then((res) => { this.setState({
      venues: res.data
    })
  })
}


onLoginSuccess(user) {
  this.setState({ currentUser: clientAuth.getCurrentUser() })
}

logOut() {
  clientAuth.logOut()
  this.setState({ currentUser: null })
}



  render() {
   
    const { currentUser } = this.state

    


    return (
      <div className="App">
       
          <NavBar currentUser={currentUser} />

          <h1 className="App-title">Welcome to React</h1>


          <Route exact path="/login" render={(props) => {
						return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
					}} />

					<Route exact path="/logout" render={(props) => {
						return <LogOut onLogOut={this.logOut.bind(this)} />
					}} />

					{/* the sign up component takes an 'onSignUpSuccess' prop which will perform the same thing as onLoginSuccess: set the state to contain the currentUser */}
					<Route exact path="/signup" render={(props) => {
						return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
					}} />

         

          <Route exact path="/api/venues" render={(props)=> {
              console.log('Props:  ', props.match, 'Venues: ', this.state.venues)

              return <Venues venues={this.state.venues} updateDOM={this.updateDOM} />} }/>
            
            <Route exact path="/api/venues/:id" render={(props)=> {
              console.log('Props:  ', props.match.params.id, 'Show Venue: ', this.state.venues)
              return <Venue venueId={props.match.params.id} updateDOM={this.updateDOM} />} }/>
            {/* CREATE venue*/}
            <Route exact path="/api/venues-new/" render={(props)=> {
              console.log('Props:  ', props.match.params.id )
              return <VenueCreate  updateDOM={this.updateDOM} />} }/>

            {/* EDIT venue*/}
            <Route exact path="/api/venues-edit/:id" render={(props)=> {
              console.log('Venue-Edit-Props:  ', props.match.params.id , 'Venues: ', this.state.venues)
              return <VenueEdit keyID={props.match.params.id} history={props.history} venues={this.state.venues} updateDOM={this.updateDOM} />} }/>

              {/* ----=====  SHOW All ORDERS =====----- */}
                  <Route exact path="/api/orders" render={(props)=> {
                  console.log('Order-Props:  ', props.match)
                  return <Orders myProps={props.match} updateDOM={this.updateDOM} />} }/>  

                  <Route exact path="/api/orders/:id" render={(props)=> {
                  console.log('Order-Props:  ', props.match.params.id, 'Venues Prop:' , this.state.venues)
                return <Order orderId={props.match.params.id} updateDOM={this.updateDOM} venues={this.state.venues} />} }/>
                
                {/* CREATE Order*/}
                <Route exact path="/api/orders-new/" render={(props)=> {
                  console.log('Order-Props:  ', props.match.params.id )
                  return <OrderCreate history={props.history} updateDOM={this.updateDOM} venues={this.state.venues} />} }/>
                {/* EDIT Order*/}
                <Route exact path="/api/orders-edit/:id" render={(props)=> {
                  console.log('Order-Edit-Props:  ', props.match.params.id )
                  return <OrderEdit keyID={props.match.params.id} history={props.history} updateDOM={this.updateDOM} venues={this.state.venues} />} }/>
              {/* SEARCH Orders*/}
                <Route exact path="/api/orders-search" render={(props)=> {
                  console.log('Order-Search-Props:  ', props.match.params.id )
                  return <OrderSearch keyID={props.match.params.id} history={props.history} updateDOM={this.updateDOM} venues={this.state.venues} />} }/>

                  {/* ----=====  USERS =====----- */}

                  <Route exact path="/api/user/:id" render={(props)=> {
                  console.log('User-Props:  ', props.match, ' User: ' , currentUser, 'ID:', currentUser._id)
                  return <User myProps={props.match} user={currentUser} updateDOM={this.updateDOM} />} }/>  
                  {/* EDIT User*/}
                  <Route exact path="/api/user-edit/:id" render={(props)=> {
                  console.log('User-Edit-Props:  ', props.match, ' User: ' , currentUser, 'ID:', currentUser._id)
                  return <UserEdit myProps={props.match} user={currentUser} updateDOM={this.updateDOM} />} }/>  

              {/* HOME SPLASH SCREEN */}
                <Route exact path="/" component={Home} />
      </div>
    );
  }
}

export default App;
