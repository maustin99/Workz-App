

const
mongoose = require('mongoose')


venueSchema = new mongoose.Schema({
    name: {type: String, required: true },
    address: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: String},
    country: {type: String},
    phoneNumber: {type: String},
    map: {type: String},
    pictureURL: {type: String},
    pictureLOGO: {type: String},
    ven_levels: {type: String},
    ven_sections: {type: String},
    ven_departments: {type: String},
    website: {type: String},
    vlocationX: {type: String},
    vlocationY: {type: String},
   

})


const Venue = mongoose.model('Venue', venueSchema)
module.exports = Venue


