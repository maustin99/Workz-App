import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'



class VenueCreate extends React.Component {

    state = {
        venue: {},
        fireRedirect: false
    }


    componentDidMount = () => {

       

    }// end DidMount


    addVenue(evt){
        evt.preventDefault()
        console.log('submit button fired')

            axios({method: 'post', url: `/api/venues/`, data: {
                
                name: this.refs.name.value,
                address: this.refs.address.value,
                city: this.refs.city.value,
                state: this.refs.state.value,
                country: this.refs.country.value,
                phoneNumber: this.refs.phoneNumber.value,
                pictureURL: this.refs.pictureURL.value,
                pictureLOGO: this.refs.pictureLOGO.value

            } //end data
        }).then((res) => {
                this.setState({
                    venue: res.data,
                    fireRedirect: true
                })
                this.props.updateDOM()
            }) //end AXIOS


            
    }




    render() {

   
    console.log('Venue-Create')


      return (
        <div className="VenueCreate">
          <h1>The Create Venue Page</h1>
  
          <form onSubmit={this.addVenue.bind(this)}>
            <input type="text" ref="name" placeholder="Venue Name" /><br/>
            <input type="text" ref="address" placeholder="Address" /><br/>
            <input type="text" ref="city" placeholder="City" /><br/>
            <input type="text" ref="state" placeholder="State" /><br/>
            <input type="text" ref="country" placeholder="Country" /><br/>
            <input type="text" ref="phoneNumber" placeholder="Main Phone Number" /><br/>
            <input type="text" ref="pictureURL" placeholder="Venure Picture URL" /><br/>
            <input type="text" ref="pictureLOGO" placeholder="Venue Logo URL" /><br/>
            <button>Submit Venue</button>
        </form>

         {/* REDIRECT TRIGGER */}
         {this.state.fireRedirect && ( 
                <Redirect to={ '/api/venues/' }  />
        )}

  
        </div>
      );
    }
  }
  
  export default VenueCreate;
  