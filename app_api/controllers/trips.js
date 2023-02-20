
const mongoose = require('mongoose'); //import mongoose
const model = mongoose.model('trips'); //import model
const User = mongoose.model('users')


//GET: gets the user to use as auth
const getUser = (req, res, callback) => 
{
    //added to debug 
    //console.log('req.payload: ' + req.payload + "    req.payload.email: " + req.body.code);

    if (req.body && req.body.email) 
    {       
      User
        .findOne({ email : req.body.email })    
        .exec((err, user) => 
        {
            if (!user) 
            {
                return res
                  .status(404)
                  .json({"message": "User not found 1"});
            }
            
            else if (err) 
            {
                console.log(err);
                return res
                  .status(404)
                  .json(err);
            }
            
            callback(req, res, user.name);        
        });

    } 
    
    else 
    {
      return res
        .status(404)
        .json({"message": "User not found 2"});
    }
};  

//GET: single trip using trip code
const tripsFindByCode = async(req, res) => 
{
    model
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
    model
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

//POST: add trip
const tripsAddTrip = async (req, res) =>
{
    //confirm auth
    //getUser(req, res, 
    //    (req, res) =>
    //{
        model
        //mongoose method to add a document to a collection 
        .create(
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        },
        (err, trip) => 
        {
            if(err)
            {
                return res
                    .status(400) //invalid content
                    .json(err);    
            }
            else
            {
                return res
                    .status(201) // created
                    .json(trip);
            }
        
        });
    //});
};

//PUT: update trip
const tripsUpdateTrip = async (req, res) => 
{
    //confirm auth
    //getUser(req, res, (req, res) =>
    //{
        model
            //mongoose find one element (by code) and update all values
            .findOneAndUpdate({ 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description           
            }, { new : true })
            
            //error handling
            .then(trip => 
            {
                if(!trip) 
                {
                    return res
                        .status(404) //not found
                        .send({ message: "No such trip found with code: " + req.params.tripCode });
                }
                res.send(trip);

            }).catch(err =>
                {
                    if(err.kind === 'ObjectId')
                    {
                        return res
                            .status(404) //not found
                            .send({ message: "No such trip found with code: " + req.params.tripCode });
                    }
                    return res
                        .status(500) //server error
                        .json(err);
                });
    //});
};                                                   

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    getUser
};