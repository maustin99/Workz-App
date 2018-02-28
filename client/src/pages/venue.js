import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'
import GoogleMapReact from 'google-map-react'

const ARC_DE_TRIOMPHE_POSITION = {
  lat: 48.873947,
  lng: 2.295038
};



// var MAIN_POSITION = {}

const MAIN_POSITION = {
        lat:  34.0430245,
        lng: -118.2674181
      }

// const MAIN_POSITION = {
//   lat:  this.state.venue.vlocationX,
//  lng: this.state.venue.vlocationY
// }



class Venue extends React.Component {

  constructor() {
    super();
    this.panToArcDe
   
     
    };


    state = {
        venue: null,
        fireRedirect: false,
        MY_MAP: {
          lat:  34.0430245,
          lng: -118.2674181
        }
        
    }

    // lat: 34.0430245,
    // lng: -118.2674181

    componentDidMount = () => {
      
      var dataX
      var dataY 

        axios({method: 'get', url: `/api/venues/${this.props.venueId}`})
            .then((res) => { 
              if (!res.data.vlocationX ){
                // dataX = 34.0430245
                // dataY = -118.2674181
              }else{
               dataX = parseFloat(res.data.vlocationX)
               dataY = parseFloat(res.data.vlocationY)
               //document.getElementById('MapWarning').style.visibility = "hidden";
              }

               // this.map = new google.maps.Map(this.refs.map, {
               //   center: this.state.MY_MAP,
               //   zoom: 18
               // });
               
              this.setState({
              venue: res.data,
              MY_MAP: {
                lat: dataX,
                lng: dataY
              }
            })
            //console.log('Venue Data:::', this.state.venue.vlocationX )
            console.log('check MY_MAP::', this.state.MY_MAP, )
                }) //end AXIOS

              

           

            
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

    

    // findMapVenue(){
    //    MAIN_POSITION = {
    //     lat:  this.state.venue.vlocationX,
    //     lng: this.state.venue.vlocationY
    //   }
    // }

    render() {

      const mapStyle = {
        width: 500,
        height: 300,
        border: '1px solid black'
      };

      
      
   
    console.log('Venue - Props:', this.props)


      if(!this.state.venue) return <h1>Loading...</h1>
      return (
        <div className="Venue" >
           
                <h1>Venue Page</h1>
                
            <div id="venuesSmallContainer">
                <h1>{this.state.venue.name}</h1>
                <img height="100px" src={this.state.venue.pictureLOGO} />
                <h3>{this.state.venue.address}</h3>
                <h3>{this.state.venue.city}</h3>
                <h3>{this.state.venue.state} {this.state.venue.zip}</h3>
                <h3>{this.state.venue.phoneNumber}</h3>
                <br/>
                <br/>
        
                  {/* REDIRECT TRIGGER */}
              {this.state.fireRedirect && ( 
                      <Redirect to={ '/api/venues/' }  />
              )}

                  <br/>

                  {/* <h3>My Google Maps Demo</h3> */}
                  {/* <button onClick={this.panToArcDeTriomphe.bind(this)} >Go to Arc De Triomphe</button>  */}
                  {/* <div className="MapWarning"><h3>Map Not Available</h3></div> */}
                  <div className="Map">
                    <GoogleMapReact
                      bootstrapURLKeys={{key: "AIzaSyCbFUUS7wM3ls1udM5UwzZWBTL1NI0NT0M"}}
                      defaultCenter={this.state.MY_MAP}
                      center={this.state.MY_MAP}
                      defaultZoom={18}
                     
                      
                    />

                  </div>
                  {/* <div id="map" ref="map" style={mapStyle}>I should be a map!</div> */}
                  
                  <br/>
                  <br/>
                  <Link to={`/api/venues`}><p>Return to Venues</p></Link>

                  <Link to={`/api/venues-edit/${this.state.venue._id}`}><p>Edit the Venue</p></Link>

                  <Link to={`/api/venues/`} onClick={this.deleteThisVenue.bind(this)}><p>Delete the Venue</p></Link>
                  <br/>


              </div>
        </div> //END Class DIV
      );
    }
  }
  
  export default Venue;
  