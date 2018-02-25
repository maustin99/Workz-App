import React, { Component } from 'react';
import './App.css';
// import the axios module:
import axios from 'axios'
//import jwtDecode from 'jwt-decode'
import { Route, NavLink } from 'react-router-dom'

import Venues from './pages/venues.js';
import Venue from './pages/venue.js';
import VenueCreate from './pages/venue-create.js';
import VenueEdit from './pages/venue-edit.js';
import Orders from './pages/orders.js';
import Order from './pages/order.js';
import OrderCreate from './pages/order-create.js';
import OrderEdit from './pages/order-edit.js';
import OrderSearch from './pages/order-search.js';
  


class App extends Component {
  state = {
      venues: []
    
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




  render() {
   


    


    return (
      <div className="App">
       
          <h1 className="App-title">Welcome to React</h1>

           
         

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
                  console.log('Order-Props:  ', props.match.params.id)
                return <Order orderId={props.match.params.id} updateDOM={this.updateDOM} />} }/>
                
                {/* CREATE Order*/}
                <Route exact path="/api/orders-new/" render={(props)=> {
                  console.log('Order-Props:  ', props.match.params.id )
                  return <OrderCreate history={props.history} updateDOM={this.updateDOM} />} }/>
                {/* EDIT Order*/}
                <Route exact path="/api/orders-edit/:id" render={(props)=> {
                  console.log('Order-Edit-Props:  ', props.match.params.id )
                  return <OrderEdit keyID={props.match.params.id} history={props.history} updateDOM={this.updateDOM} />} }/>
              {/* SEARCH Orders*/}
                <Route exact path="/api/orders-search" render={(props)=> {
                  console.log('Order-Search-Props:  ', props.match.params.id )
                  return <OrderSearch keyID={props.match.params.id} history={props.history} updateDOM={this.updateDOM} venues={this.state.venues} />} }/>


      </div>
    );
  }
}

export default App;
