import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'
import staplesCenter from './Staples-Center-seating.jpg'
import mapPin from './images/map_marker.png'
/*global google*/

const ARC_DE_TRIOMPHE_POSITION = {
  lat: 48.873947,
  lng: 2.295038
};

const MAIN_POSITION = {
  lat: 34.0430245,
  lng: -118.2674181
};



class Order extends React.Component {
  
  constructor() {
    super();
    this.panToArcDe
  
    };

  

    state = {
        order: {},
        fireRedirect: false,

         divStyle: {
          //backgroundColor:  'rgba(255, 153, 0, .65)', 
          visibility: 'hidden',
          top: '0px',
          left: '0px'
        }
        
    } //end state


    componentDidMount = () => {
     

        axios({method: 'get', url: `/api/orders/${this.props.orderId}`})
            .then((res) => {
              console.log('LOCATION x:' , res.data.locationX)
              console.log('LOCATION y:' , res.data.locationY)
              this.setState({
                order: res.data,
                  divStyle: { ...this.state.divStyle , 
                  visibility: 'visible',
                    top: res.data.locationY-65,
                    left: res.data.locationX-50
                }
              })
            }) //end AXIOS



                this.map = new google.maps.Map(this.refs.map, {
                  center: MAIN_POSITION,
                  zoom: 18
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


   handleImageClick(evt){
    const event = evt.nativeEvent

    console.log("Top / Left of click on photo:")
    console.log(event.offsetX, event.offsetY)

    console.log("Total Width / Height of Photo:")
    console.log(event.target.offsetWidth, event.target.offsetHeight)
    console.log(event)

   

    this.setState({
        divStyle: { ...this.state.divStyle , 
        visibility: 'visible',
          top: event.offsetY-65,
          left: event.offsetX-49
       }
    }) //end SET

    axios({method: 'patch', url: `/api/orders/${this.props.orderId}`, data: {
      locationX: event.offsetX , locationY: event.offsetY}})
            .then((res) => {
              console.log(res)
            })

 

  }//end Handle



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

            <div id="imageWrapper">
                <div id="facilityImage">
                      <img id="image" onClick={this.handleImageClick.bind(this)} src={staplesCenter} /> <br/> 
                </div>  
                      <div id="topImage"  style={this.state.divStyle}>
                      <img src={mapPin}  />
                  </div>
              </div>

              <br/>
              <br/>

            <h3>My Google Maps Demo</h3>
             <button onClick={this.panToArcDeTriomphe.bind(this)} >Go to Arc De Triomphe</button> 
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
          <br/>

           {/* REDIRECT TRIGGER */}
        {this.state.fireRedirect && ( 
                <Redirect to={ '/api/orders/' }  />
        )}

           
              

            
        </div>
      ) //end return
    


 





    
    } //END RENDER

    
   } //end CLASS
  

  export default Order;
  