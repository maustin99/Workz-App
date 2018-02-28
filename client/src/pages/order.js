import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'
import staplesCenter from './Staples-Center-seating.jpg'
import mapPin from './images/map_marker.png'


let myVenueURL = ""

class Order extends React.Component {
    
  

    state = {
        order: {},
        fireRedirect: false,
        venues: [],

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
                    top: res.data.locationY-52,
                    left: res.data.locationX-50
                }
              })
            }) //end AXIOS


            axios({method: 'get', url: '/api/venues'})
            .then((res) => { this.setState({
              venues: res.data
            }, ()=>{
              this.state.venues.map((v, index)=>{
                //console.log('V:::', v.name)
                if ( this.state.order.venue === v.name){
                  myVenueURL = v.facilityPlanURL
                  console.log('venue URL::::', myVenueURL)
                return (v.facilityPlanURL)
                }
          })
            })
            console.log('LOADING axios VENUES:  ', this.state.venues )
          })//end axio venue call
          
          
          


               
      }// end DidMount

   


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
          top: event.offsetY-52,
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

      
  



      return (
        <div className="Order">

                <div id="orderContainer">
                      {/* <h1>The Show Order Page</h1> */}
                      <h1>{this.state.order.problem}</h1>
                      <div id="smallContainer">
                      
                      
                       <span><span id="orderTag">Order #:</span>{this.state.order.order_id}</span><br/><br/>
                      <span><span id="orderTag">Venue:</span>{this.state.order.venue}</span><br/><br/>
                      <span><span id="orderTag">Location: </span>{this.state.order.location}</span><br/><br/>
                      <span><span id="orderTag">Level:</span>{this.state.order.level}</span><br/><br/>
                      <span><span id="orderTag">Section:</span>{this.state.order.section}</span><br/><br/>
                      <span><span id="orderTag">Aisle:</span>{this.state.order.aisle}</span><br/><br/>
                      <span><span id="orderTag">Row:</span>{this.state.order.row}</span><br/><br/>
                      <span><span id="orderTag">Seat #:</span>{this.state.order.seat}</span><br/><br/>
                      </div>
                        <br/>
                        <br/>
                  </div> {/* END order container */}

                        <div id="imageWrapper">
                            <div id="facilityImage">
                                  <img id="image" onClick={this.handleImageClick.bind(this)} src={myVenueURL && myVenueURL} /> <br/> 
                            </div>  
                                  <div id="topImage"  style={this.state.divStyle}>
                                  <img src={mapPin}  />
                              </div>
                          </div>

                          <br/>
                     
                        {/* <Link to={`/api/orders/`}>See All Orders</Link> */}
                      <br/>
                      <br/>
                      <Link to={`/api/orders-search/`}>Return to Orders Search Page</Link>
                      <br/>
                      <br/> 
                      <Link to={`/api/orders-edit/${this.state.order._id}`}>Edit the Order</Link> 
                      <br/>
                      <br/>
                      <Link to={`/api/orders/`} onClick={this.deleteThisOrder.bind(this)}>Delete the Order</Link> 
                      <br/>
                      <br/>
                      <br/>

                      {/* REDIRECT TRIGGER */}
                    {this.state.fireRedirect && ( 
                            <Redirect to={ '/api/orders/' }  />
                    )}

                      
                      <br/>
                    
                    
                    
               
            
        </div> //END Order CLASS
      ) //end return
    


 





    
    } //END RENDER

    
   } //end CLASS
  

  export default Order;
  