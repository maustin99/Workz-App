import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'



class Venue extends React.Component {

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

    }// end DidMount


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

        </div>
      );
    }
  }
  
  export default Venue;
  