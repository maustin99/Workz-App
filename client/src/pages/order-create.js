import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
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
                venue: this.refs.venue.value,
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

   


      return (
        <div className="OrderCreate">
          <h1>The Create Order Page</h1>
  
          <form onSubmit={this.addOrder.bind(this)}>
            <input type="text" ref="problem" placeholder="Order Problem" /><br/>
            <input type="text" ref="order_id" placeholder="Order ID Number" /><br/>
            <input type="text" ref="venue" placeholder="Venue Name" /><br/>
            <input type="text" ref="location" placeholder="Problem Location" /><br/>
            <input type="text" ref="level" placeholder="Level" /><br/>
            <input type="text" ref="section" placeholder="Section" /><br/>
            <input type="text" ref="aisle" placeholder="Aisle" /><br/>
            <input type="text" ref="row" placeholder="Row" /><br/>
            <input type="text" ref="seat" placeholder="Seat" /><br/>
            <input type="text" ref="photo" placeholder="Attach a Photo" /><br/>
            <button>Submit Order</button>
        </form>

        

  
        </div>
      );
    }
  }
  
  export default OrderCreate;
  