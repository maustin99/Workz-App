import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'
/*global google*/

const ARC_DE_TRIOMPHE_POSITION = {
  lat: 48.873947,
  lng: 2.295038
};

const MAIN_POSITION = {
  lat: 34.0430245,
  lng: -118.2674181
};


class Venue extends React.Component {

  constructor() {
    super();
    this.panToArcDe
  
    };


    state = {
        venue: {},
        fireRedirect: false
        
    }


    componentDidMount = () => {

        axios({method: 'get', url: `/api/venues/${this.props.venueId}`})
            .then((res) => { this.setState({
              venue: res.data
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

    deleteThisVenue(evt){
        evt.preventDefault()
        console.log('delete button fired')

        axios({method: 'delete', url: `/api/venues/${this.props.venueId}`})
        .then((res) => { this.setState({
          venue: res.data,
          fireRedirect: true
        })
        this.props.updateDOM()

            }) //end AXIOS

    }//end DELETE


    render() {

      const mapStyle = {
        width: 500,
        height: 300,
        border: '1px solid black'
      };

   
    console.log('Venue - Props:', this.props)



      return (
        <div className="Venue">
          <h1>The Show Venue Page</h1>
  
           <h1>{this.state.venue.name}</h1>
           <h2>{this.state.venue.address}</h2>
           <h2>{this.state.venue.city}</h2>
           <br/>
           <br/>
           <Link to={`/api/venues-edit/${this.state.venue._id}`}>Edit the Venue</Link>
           <br/>
           <br/>
           <Link to={`/api/venues/`} onClick={this.deleteThisVenue.bind(this)}>Delete the Venue</Link>
  
             {/* REDIRECT TRIGGER */}
        {this.state.fireRedirect && ( 
                <Redirect to={ '/api/venues/' }  />
        )}

            <br/>

            <h3>My Google Maps Demo</h3>
            <button onClick={this.panToArcDeTriomphe.bind(this)} >Go to Arc De Triomphe</button> 
            <div ref="map" style={mapStyle}>I should be a map!</div>
            <br/>


        </div>
      );
    }
  }
  
  export default Venue;
  