import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'




class Venues extends React.Component {

    constructor(props){
        super(props)
        this.state = {}
    }

    render() {

    const myVenues = this.props.venues


      return (
        <div className="Venues">
          <h1>The Venues Page</h1>
  
  
      {myVenues.map((m, index)=>{

          return (
            <Link to={`/api/venues/${m._id}`}><p key={m._id}  >{m.name}</p></Link>
          )
      })}
  
        </div>
      );
    }
  }
  
  export default Venues;
  