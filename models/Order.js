
const
mongoose = require('mongoose'),
uniqid = require('uniqid')

orderSchema = new mongoose.Schema({
    order_id: {type: String, required: true },
    problem: {type: String, required: true },
    venue: {type: String},
    location: {type: String},
    locationX: {type: String},
    locationY: {type: String},
    level: {type: String},
    room: {type: String},
    section: {type: String},
    aisle: {type: String},
    row: {type: String},
    seat: {type: String},
    photo: {type: String},
    placed_by: {type: String},
    or_department: {type: String},
    or_division: {type: String},
    dept_phone: {type: String},
    time: {type: String},
    priority: {type: String},
    finished_time: {type: String},
    completed: {type: String},
    completed_by: {type: String},
    com_department: {type: String},
    com_division: {type: String},
    com_phone: {type: String},
    notes: {type: String}

})


const Order = mongoose.model('Order', orderSchema)
module.exports = Order


//[{type: mongoose.Schema.Types.ObjectId, ref: 'Venue'}]

//uniqid()