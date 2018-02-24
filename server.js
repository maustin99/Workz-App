const
dotenv = require('dotenv').config(),
 express = require('express'),
 app = express(),
 logger = require('morgan'),
 bodyParser = require('body-parser'),
 uniqid = require('uniqid'),
 mongoose = require('mongoose'),
 MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/works_app',

usersRoutes = require('./routes/users.js'),
venuesRoutes = require('./routes/venues.js'),
ordersRoutes = require('./routes/orders.js'),
 
PORT = process.env.PORT || 3001


mongoose.connect(MONGODB_URI, (err) =>{
    console.log(err || 'Connected to MongoDB')
})

// when deployed to Heroku, our react app will be automatically be
// compiled and the static files (html, js, css) will be placed in
// /client/build for us:
app.use(express.static(`${__dirname}/client/build`))
app.use(logger('dev'))
app.use(bodyParser.json())


app.get('/api', (req, res) => {
 res.json({message: "api root."})
})

app.use('/api/users', usersRoutes)
app.use('/api/venues', venuesRoutes)
app.use('/api/orders', ordersRoutes)


// This should be the last route declared in our app. Once deployed to Heroku, any requests to a route NOT declared above will serve the static react application.
app.get('*', (req, res) => {
res.sendFile(`${__dirname}/client/build/index.html`)
})

app.listen(PORT, (err) => {
 console.log(err || `Server running on port ${PORT}.`)
})