import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'
/*global google*/


const ARC_DE_TRIOMPHE_POSITION = {
  lat: 48.873947,
  lng: 2.295038
};

const EIFFEL_TOWER_POSITION = {
  lat: 34.0430245,
  lng: -118.2674181
};



class Order extends React.Component {
  
  constructor() {
    super();
    this.panToArcDe
   
  }

    state = {
        order: {},
        fireRedirect: false
        
    }


    componentDidMount = () => {
     

        axios({method: 'get', url: `/api/orders/${this.props.orderId}`})
            .then((res) => { this.setState({
                order: res.data
            })
                }) //end AXIOS



                this.map = new google.maps.Map(this.refs.map, {
                  center: EIFFEL_TOWER_POSITION,
                  zoom: 16
                });
    }// end DidMount

    panToArcDeTriomphe(evt) {
      console.log(this)
     
      this.map.panTo(ARC_DE_TRIOMPHE_POSITION);
    }


    deleteThisOrder(evt){
          evt.preventDefault()
          console.log('delete button fired')

          axios({method: 'delete', url: `/api/orders/${this.props.orderId}`})
          .then((res) => { this.setState({
            order: res.data,
            fireRedirect: true
           
          })
          //this.props.history.push("/api/orders")
          this.props.updateDOM()

          }) //end AXIOS

  }//end DELETE




    render() {

       const mapStyle = {
      width: 500,
      height: 300,
      border: '1px solid black'
    };
      
    


      return (
        <div className="Order">
          <h1>The Show Order Page</h1>
  
           <h1>{this.state.order.problem}</h1>
           <h2>Order #: {this.state.order.order_id}</h2>
           <h2>Venue: {this.state.order.venue}</h2>
           <h2>Location: {this.state.order.location}</h2>
           <h2>Level:{this.state.order.level}</h2>
           <h2>Section:{this.state.order.section}</h2>
           <h2>Aisle:{this.state.order.aisle}</h2>
           <h2>Row:{this.state.order.row}</h2>
           <h2>Seat #:{this.state.order.seat}</h2>

            <br/>
            <br/>

            <h3>My Google Maps Demo</h3>
            <button onClick={this.panToArcDeTriomphe.bind(this)}>Go to Arc De Triomphe</button>
            <div ref="map" style={mapStyle}>I should be a map!</div>
            <br/>
            <br/>
            <Link to={`/api/orders/`}>See All Orders</Link>
           <br/>
           <br/>
          <Link to={`/api/orders-edit/${this.state.order._id}`}>Edit the Order</Link> 
           <br/>
           <br/>
           <Link to={`/api/orders/`} onClick={this.deleteThisOrder.bind(this)}>Delete the Order</Link> 
  
           {/* REDIRECT TRIGGER */}
        {this.state.fireRedirect && ( 
                <Redirect to={ '/api/orders/' }  />
        )}

            
        </div>
      );
    }
  }
  
  export default Order;
  