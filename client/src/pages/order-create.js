import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'



class OrderCreate extends React.Component {

    state = {
        order: {},
        
    }


    componentDidMount = () => {

       

    }// end DidMount


    addOrder(evt){
        evt.preventDefault()
        console.log('submit button fired')

            axios({method: 'post', url: `/api/orders/`, data: {
                
                problem: this.refs.problem.value,
                order_id: this.refs.order_id.value,
                venue: document.getElementById("mySelect").value,
                location: this.refs.location.value,
                level: this.refs.level.value,
                section: this.refs.section.value,
                aisle: this.refs.aisle.value,
                row: this.refs.row.value,
                seat: this.refs.seat.value,
                photo: this.refs.photo.value

            } //end data
        }).then((res) => {
                this.setState({
                    order: res.data
                  
                })
                this.props.history.push("/api/orders")
                this.props.updateDOM()
            }) //end AXIOS


            
    }




    render() {

        const myVenues = this.props.venues


      return (
        <div className="OrderCreate">
                
                    <h1>Create an ORDRZ</h1>
            <div id="orderEditSmallContainer">
            <div id="OrderEdit-LeftColumn">
                         <span id="orderEditTag">Problem:</span>
                         <span id="orderEditTag">Order ID #:</span>
                         <span id="orderEditTag">Venue:</span>
                         <span id="orderEditTag">Location:</span>
                         <span id="orderEditTag">Level:</span>
                         <span id="orderEditTag">Section:</span>
                         <span id="orderEditTag">Aisle:</span>
                         <span id="orderEditTag">Row:</span>
                         <span id="orderEditTag">Seat:</span>
                         <span id="orderEditTag">Attach a Photo:</span>
                </div>{/* END LEFT COLUMN*/}
                <div id="OrderEdit-RightColumn">
                    <form onSubmit={this.addOrder.bind(this)}>
                        <input type="text" ref="problem" placeholder="Order Problem" /><br/>
                        <input type="text" ref="order_id" placeholder="Order ID Number" /><br/>

                        {/* <input type="text" ref="venue" placeholder="Venue Name" /><br/> */}
                        <select id="mySelect" >
                                <option key="selected" selected="">Please Select Facility</option>
                                {myVenues.map((v, index)=>{
                                    //console.log('print:', v.name)
                                return <option key={index} >{v.name}</option>
                                })}
                        </select>
                        <br/>
                        <input type="text" ref="location" placeholder="Problem Location" /><br/>
                        <input type="text" ref="level" placeholder="Level" /><br/>
                        <input type="text" ref="section" placeholder="Section" /><br/>
                        <input type="text" ref="aisle" placeholder="Aisle" /><br/>
                        <input type="text" ref="row" placeholder="Row" /><br/>
                        <input type="text" ref="seat" placeholder="Seat" /><br/>
                        <input type="text" ref="photo" placeholder="Attach a Photo" /><br/>
                        <button>Create Order</button>
                    </form>
                </div>   {/* END RIGHT Column */}                          
                

              </div>  {/* END SMALL CONTAINER*/} 
              <br/>
                <br/>
                <Link to={`/api/orders-search`}><p>Return to Order Search</p></Link>               
        </div> //End CLASS*
      );
    }
  }
  
  export default OrderCreate;
  