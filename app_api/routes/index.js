
//this file contains the routes to different api endpoints
//due to jwt, this deviates slightly from the guide

const express = require('express');
var apiRouter = express.Router();

const {expressjwt : jwt} = require('express-jwt');
const auth = jwt({
                    secret: process.env.JWT_SECRET,
                    userProperty: 'payload',
                    algorithms: ['HS256']
                });

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

//login
apiRouter
    .route('/login')
    .post(authController.login);


//registration
apiRouter
    .route('/register')
    .post(authController.register);


//return all trips
apiRouter 
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);


//return trip by code
apiRouter
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = apiRouter;

