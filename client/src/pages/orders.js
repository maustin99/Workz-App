import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'



class Orders extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          orders: []

        }
    }

    componentDidMount = () =>{
      console.log('mount')

      // make a test API call:
      axios({method: 'get', url: '/api/orders'})
      .then((res) => { this.setState({
        orders: res.data
        })
        console.log('res.data:', res.data)
      })
      console.log('Data: ', this.state.orders)
      console.log('My Props-client-side: ', this.props.myProps)
    }


    render() {

    const myOrders = this.state.orders


      return (
        <div className="Orders">
          <h1>The Orders Page</h1>
  
  
      {myOrders.map((m, index)=>{

          return (
            <Link to={`/api/orders/${m._id}`}><p key={m._id}  >{m.problem}</p></Link>
          )
      })}
  
        </div>
      );
    }
  }
  
  export default Orders;
  