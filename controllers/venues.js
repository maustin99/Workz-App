const 
    Venue = require('../models/Venue.js')
    




    module.exports = {
        // list all venues
        index: (req, res) => {
            Venue.find({}, (err, venues) => {
                res.json(venues)
            })
        },
    
        // get one Venue
        show: (req, res) => {
            
            Venue.findById(req.params.id, (err, venue) => {
                console.log("Current Venue:")
                console.log(venue)
                console.log('Serverside-Params ID:', req.params.id)
                res.json(venue)
            })
        },
    
        // create a new Venue
        create: (req, res) => {

            console.log("Create Venue triggered")
            Venue.create(req.body, (err, venue) => {
                if(err) return res.json({success: false, code: err.code})              
                res.json({success: true, message: " Venue created. ", venue }) 
            })
        },
    
        // update an existing Venue
        update: (req, res) => {
            Venue.findById(req.params.id, (err, venue) => {
                Object.assign(venue, req.body)   //merges objects  together
                venue.save((err, updatedVenue) => {
                    res.json({success: true, message: "Venue updated.", updatedVenue})
                })
            })
        },
    
        // delete an existing Venue
        destroy: (req, res) => {
            Venue.findByIdAndRemove(req.params.id, (err, venue) => {
                res.json({success: true, message: "Venue deleted.", venue})
            })
        }

    }