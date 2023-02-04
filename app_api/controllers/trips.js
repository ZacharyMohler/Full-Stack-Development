const mongoose = require('mongoose'); //import mongoose
const Model = mongoose.model('trips'); //import model


//GET: single trip using trip code
const tripsFindByCode = async(req, res) => 
{
    Model
        .find({'code': req.params.tripCode}) //mongoose method, returns trip given a tripCode
        .exec((err, trip) => 
        {
            //trip not found
            if(!trip) 
            {
                return res
                   .status(404) //send 404 error
                   .json({ "message" : "trip not found"}); //send json error
            }

            //other error
            else if(err)
            {
                return res
                    .status(404)
                    .json(err);
            }

            //no errors, set html code and return
            else
            {
                return res
                    .status(200)
                    .json(trip);
            }
        });
};

//GET: list all trips
const tripsList = async(req, res) => 
{
    Model
        .find({}) //mongoose method, returns all trips
        .exec((err, trips) => 
        {
            //trips not found
            if(!trips) 
            {
                return res
                   .status(404) //send 404 error
                   .json({ "message" : "trips not found"}); //send json error
            }

            //other error
            else if(err)
            {
                return res
                    .status(404)
                    .json(err);
            }

            //no errors, set html code and return
            else
            {
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

module.exports = {
    tripsList,
    tripsFindByCode
};