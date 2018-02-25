import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'



class OrderSearch extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          orders: [],
          filterString: '',
          myFacility: ''

        }
    }

    updateFilter(){

        this.setState({
             filterString: this.refs.searchInput.value
        })
      
       }

       changeFacility(evt){
            console.log('FACILITY CHANGE', document.getElementById("mySelect").value)
            this.setState({
                myFacility: document.getElementById("mySelect").value
           })
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
    const myVenues = this.props.venues
    const { filterString } = this.state
    const allOrders = myOrders.filter((f)=>{
            if ( (this.state.myFacility === "All Arenas" ) || (f.venue === this.state.myFacility) ) {
            var go = f.problem.toLowerCase().includes(filterString.toLowerCase()) 
            }
              return go
              })
      
      return (
        <div className="OrderSearch">
          <h1>The Order Search Page</h1>
     
            <select id="mySelect" onChange={this.changeFacility.bind(this)}>
                    <option key="selected" selected="">Please Select Facility</option>
                    <option key="all">All Arenas</option>
                    {myVenues.map((v, index)=>{
                        //console.log('print:', v.name)
                       return <option key={index} >{v.name}</option>
                    })}

            </select>

            <br/>
          <input  onChange={this.updateFilter.bind(this)} ref="searchInput" className="input is-large" type="text" placeholder="Filter All Orders" />
            <br/>
          
          <ul className="order-list">
        
                {  allOrders.map((b, index)=>{       
                return (
                    <div>
                    <h3>{b.venue}</h3>
                    <h3 key={b._id}>
                    <Link to={`/api/orders/${b._id}`}>{b.problem}</Link>
                    </h3>
                    <h3>{b.order_id}</h3>
                    </div>
                )
                    }) /* close MAP*/ }    
            </ul>
     
     
     
      {/* {myOrders.map((m, index)=>{

          return (
            <Link to={`/api/orders/${m._id}`}><p key={m._id}  >{m.problem}</p></Link>
          )
      })} */}
  
        </div>
      );
    }
  }
  
  export default OrderSearch;
  