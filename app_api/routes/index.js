const express = require('express');
var apiRouter = express.Router();
const tripsController = require('../controllers/trips');

//return all trips
apiRouter 
    .route('/trips')
    .get(tripsController.tripsList)

//return trip by code
apiRouter
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)

module.exports = apiRouter;
