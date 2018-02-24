import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'



class Order extends React.Component {

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



    render() {

   
  


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
  