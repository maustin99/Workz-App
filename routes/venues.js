const
  express = require('express'),
  venuesRouter = new express.Router(),
  venuesCtrl = require('../controllers/venues.js'),
    verifyToken = require('../serverAuth.js').verifyToken
 


    venuesRouter.route('/')
    .get(venuesCtrl.index)
    .post(venuesCtrl.create)


    //venuesRouter.use(verifyToken) //after this line, venuesRouter will always use verifyToken

    venuesRouter.route('/:id')
     .get(venuesCtrl.show)
     .patch(venuesCtrl.update)
     .delete(venuesCtrl.destroy)


     module.exports = venuesRouter