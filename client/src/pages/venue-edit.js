import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'




class VenueEdit extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            venues: this.props.venues,
            venue: {}
           
        }
        //console.log('this.props.venues: ', this.props.venues, props)
    }

   


    componentDidMount() {

        

    }// end DidMount

    

    updateVenue(evt){
        evt.preventDefault()
        console.log('update button fired')

            axios({method: 'patch', url: `/api/venues/${this.props.keyID}`, data: {
                
                name: this.refs.name.value,
                address: this.refs.address.value,
                city: this.refs.city.value,
                state: this.refs.state.value,
                zip: this.refs.zip.value,
                country: this.refs.country.value,
                vlocationX: this.refs.vlocationX.value,
                vlocationY: this.refs.vlocationY.value,
                phoneNumber: this.refs.phoneNumber.value,
                pictureURL: this.refs.pictureURL.value,
                pictureLOGO: this.refs.pictureLOGO.value,
                facilityPlanURL:this.refs.facilityPlanURL.value

            } //end data
        }).then((res) => {
                this.props.history.push("/api/venues")
                this.props.updateDOM()
                
            }) //end AXIOS



    }




    render() {
  
        const currentVenue =  this.props.venues.find((f) =>{        
            return (f._id === this.props.keyID)
        })
        //console.log('the venue: ', this.props.venues)  
        console.log('currentVenue: ', currentVenue)
        console.log('State Venues: ', this.state.venues)

      return (
        <div className="VenueEdit">
          <h1>The EDIT Venue Page</h1>

          
  
          <form onSubmit={this.updateVenue.bind(this)}>
            <input ref="name" placeholder="Venue Name"   defaultValue={currentVenue && currentVenue.name}  /><br/>
            <input type="text" ref="address" placeholder="Address" defaultValue={currentVenue && currentVenue.address}  /><br/>
            <input type="text" ref="city" placeholder="City"  defaultValue={currentVenue && currentVenue.city}  /><br/>
            <input type="text" ref="state" placeholder="State"  defaultValue={currentVenue && currentVenue.state}  /><br/>
            <input type="text" ref="country" placeholder="Country"  defaultValue={currentVenue && currentVenue.country} /><br/>
            <input type="text" ref="zip" placeholder="Zip Code"  defaultValue={currentVenue && currentVenue.zip} /><br/>
            <input type="text" ref="vlocationX" placeholder="Map Location - Latitude" defaultValue={currentVenue && currentVenue.vlocationX} /><br/>
            <input type="text" ref="vlocationY" placeholder="Map Location - Longitude" defaultValue={currentVenue && currentVenue.vlocationY} /><br/>
            <input type="text" ref="phoneNumber" placeholder="Main Phone Number"  defaultValue={currentVenue && currentVenue.phoneNumber} /><br/>
            <input type="text" ref="pictureURL" placeholder="Venure Picture URL" defaultValue={currentVenue && currentVenue.pictureURL}  /><br/>
            <input type="text" ref="pictureLOGO" placeholder="Venue Logo URL"  defaultValue={currentVenue && currentVenue.pictureLOGO} /><br/>
            <input type="text" ref="facilityPlanURL" placeholder="Facility Floorplan URL" defaultValue={currentVenue && currentVenue.facilityPlanURL} /><br/>
            <button>Update Venue</button>
        </form>

        {/* REDIRECT TRIGGER
        {this.state.fireRedirect && ( 
                <Redirect to={ '/api/venues/' }  />
        )} */}

        <br/>
        <br/>
        <Link to={`/api/venues/${currentVenue && currentVenue._id}`}>Return to the Venue</Link>
  
        </div>
      );
    }
  }
  
  export default VenueEdit;
  