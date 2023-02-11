const express = require('express');
var apiRouter = express.Router();
const tripsController = require('../controllers/trips');

//return all trips
apiRouter 
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);


//return trip by code
apiRouter
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = apiRouter;

