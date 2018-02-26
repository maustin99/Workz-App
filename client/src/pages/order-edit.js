import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'




class OrderEdit extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            orders: [],
            order: {}
           
        }
        //console.log('this.props.venues: ', this.props.venues, props)
    }

    handleFormChange(evt) {
        const fieldName = evt.target.name
        this.setState({
            order: {
                ...this.state.order,
                [evt.target.name]: evt.target.value
            }
        })
    }
   


    componentDidMount() {

        // make a GET/SHOW API call:
        axios({method: 'get', url: `/api/orders/${this.props.keyID}`})
        .then((res) => { this.setState({
            order: res.data
        })
        console.log('current order: ', this.state.order)
        })
        
        
        //console.log('stuff', document.getElementById("mySelect").options.namedItem("Staples Center").selected=true )
        //document.getElementById("mySelect").options.namedItem(this.props.venues.name).selected=true

    }// end DidMount

    

    updateOrder(evt){
        evt.preventDefault()
        console.log('update button fired')

            axios({method: 'patch', url: `/api/orders/${this.props.keyID}`, data: this.state.order 
        }).then((res) => {
                this.props.history.push("/api/orders")
                this.props.updateDOM()
                
            }) //end AXIOS

            
    }

    updateTheVenue(evt){
        evt.preventDefault()
        //console.log('EVT' , evt.target.value)
        this.setState({
            order: {
                ...this.state.order,
                venue: evt.target.value
            }
        })

        
    }



    render() {
  
        const currentOrder = this.state.order
        const myVenues = this.props.venues


        //document.getElementById("mySelect").value = currentOrder.venue
        //console.log('NEW' , currentOrder.venue)
       

        

      return (
        <div className="OrderEdit">
          <h1>The EDIT Order Page</h1>

            {console.log('currentOrder (render()): ', currentOrder)}
  
          <form onChange={this.handleFormChange.bind(this)} onSubmit={this.updateOrder.bind(this)}>
          <input type="text" name="problem" ref="problem" placeholder="Order Problem" value={currentOrder && currentOrder.problem} /><br/>
          <input type="text" name="order_id" ref="order_id" placeholder="Order ID Number" value={currentOrder && currentOrder.order_id} /><br/>
          {/* <input type="text" name="venue" ref="venue" placeholder="Venue Name" value={currentOrder && currentOrder.venue} /><br/> */}
          <select id="mySelect" onChange={this.updateTheVenue.bind(this)} >
                    <option  key="selected" selected="">Please Select Facility</option>
                    {myVenues.map((v, index)=>{
                        if (currentOrder.venue === v.name){ 
                            return <option name="venue" id={v.name} key={index}  selected >{v.name}</option>
                        }else{
                            return <option name="venue" id={v.name} key={index}  >{v.name}</option>
                        } 
                        
                    })}
            </select>
            <br/>
          <input type="text" name="location" ref="location" placeholder="Problem Location" value={currentOrder && currentOrder.location} /><br/>
          <input type="text" name="level" ref="level" placeholder="Level" value={currentOrder && currentOrder.level} /><br/>
          <input type="text" name="section" ref="section" placeholder="Section" value={currentOrder && currentOrder.section} /><br/>
          <input type="text" name="aisle" ref="aisle" placeholder="Aisle" value={currentOrder && currentOrder.aisle} /><br/>
          <input type="text" name="row" ref="row" placeholder="Row" value={currentOrder && currentOrder.row} /><br/>
          <input type="text" name="seat" ref="seat" placeholder="Seat" value={currentOrder && currentOrder.seat} /><br/>
          <input type="text" name="photo" ref="photo" placeholder="Attach a Photo" value={currentOrder && currentOrder.photo} /><br/>
            <button>Update Order</button>
        </form>

       
        <br/>
        <br/>
        <Link to={`/api/orders/${currentOrder._id}`}>Return to the Order</Link>
  
        </div>
      );
    }
  }
  
  export default OrderEdit;
  