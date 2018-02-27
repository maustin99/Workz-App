const 
    Order = require('../models/Order.js')
    




    module.exports = {
        // list all orders
        index: (req, res) => {
            Order.find({}, (err, orders) => {
                console.log("Order GET Request")
                res.json(orders)
            })
        },
    
        // get one Order
        show: (req, res) => {
            
            Order.findById(req.params.id, (err, order) => {
                console.log("Current Order:", order)
                console.log('Serverside-Params ID:', req.params.id)
                res.json(order)
            })
        },
    
        // create a new Order
        create: (req, res) => {

            console.log("Create Order triggered")
            Order.create(req.body, (err, order) => {
                if(err) return res.json({success: false, code: err.code})              
                res.json({success: true, message: " Order created. ", order }) 
            })
        },
    
        // update an existing Order
        update: (req, res) => {
            console.log('req.body::::' , req.body)
            Order.findById(req.params.id, (err, order) => {
                Object.assign(order, req.body)   //merges objects  together
                order.save((err, updatedOrder) => {
                    res.json({success: true, message: "Order updated.", updatedOrder})
                })
            })
        },
    
        // delete an existing Venue
        destroy: (req, res) => {
            Order.findByIdAndRemove(req.params.id, (err, order) => {
                res.json({success: true, message: "Order deleted.", order})
            })
        }

    }