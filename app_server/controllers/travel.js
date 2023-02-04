//OLD WAY (STATIC JSON)
/*
var fs = require('fs');

var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// GET travel view 
const travel = (req, res) => 
{
    res.render('travel', { title: 'Travlr Getaways', trips});
};

*/


//NEW WAY (PULL RESOURCES FROM DB)

//add request model
const request = require('request');

//set default server URL
const apiOptions = {
    server: 'http://localhost:3000'
};

//GET: travel list view 
const travelList = (req, res) => 
{
    //path to method that retrieves resources 
    const path = '/api/trips';

    //holds parameters of the request
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };

    //log what we're doing to the console
    console.info('>> travelController.travelList calling ' + requestOptions.url);

    //using the request method to make the request
    request(
        //passing in our request options, and some other stuff
        requestOptions, (err, { statusCode }, body) => 
        {
            //if we get an error, log it
            if (err) 
            {
                console.error(err);
            }
            //if not, render what we got
            console.info('>> calling render');
            renderTravelList(req, res, body);
        }
    )
};

//local method for rendering the crap we get in the travelList method
const renderTravelList = (req, res, responseBody) => 
{
    //initialization stuff
    let message = null;
    let pageTitle = process.env.npm_package_description + ' - Travel';

    //if what we get isn't an array of objects something is wrong
    if (!(responseBody instanceof Array)) 
    {
        //set the message and the body 
        message = 'API lookup error';
        responseBody = [];
    } 
    //otherwise, all is well - so far
    else 
    {
        //if theres nothing inside, we loaded the wrong DB or someone emptied it (might be indicative of unseeded DB?)
        if (!responseBody.length) 
        {
            //set message
            message = 'No trips exist in our database!';
        }
    }
    //call the render method passing in the info we got
    console.info('>> rendering');
    res.render('travel', {
        title: pageTitle,
        trips: responseBody,
        message
    });
}

//only travelList needs to be available outside since render is only used locally 
module.exports = 
{
    travelList
};
