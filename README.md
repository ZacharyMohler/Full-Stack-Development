# FULL-STACK WEB APPLICATION (MEAN)
#### key skills this project displays:
MongoDB, Express, Angular, Node.js, HTTP protocol, API creation, Authentication, JWT. 

## Architecture
The Travlr application makes use of two different methods for displaying the front-facing content.

#### Main Site
The main site is a traditional webpage rendered using express and handlebars. Navigating through the site requires a new page to load which is done through injection of HTML through express and using templates created in handlebars. 
#### Administrator Site
The administrator site is an angular-run SPA. Once the admin user connects to the site, they are able to navigate quickly and with no delay. 

#### Backend
The backend uses MongoDB because it's data is stored as BSON, which translates well to JSON and JavaScript—which this application makes heavy use of in API and admin SPA implementation. 

## Functionality
As mentioned above the data format used in this application is JSON which is a very intuitive data format. The J-S in JSON stands for JavaScript, which is why the two work so well together—they were made for eachother! While JSON is the data format, JavaScript is the actual language that expresses what should happen with the data. This also ties the front and back ends together perfectly because MongoDB stores data in BSON which is just binary encoded JSON—JSON being string encoded. All this seemlessly connects the front and back end with data types that remain constant throughout the entire project.

Throughout development, I often found myself refactoring certain elements that users would view. This regularity in refactoring made the desicion to structure UI elements in parts (layouts and partials for user view, and components for Angular admin view) made refactoring tremoundously less tedious, as each element was templated out and injected at runtime rather than completely written out.

## Testing
The two main methods of testing I used throughout development were the third party application *Postman* and manual testing.
I used postman to test API functionality by sending HTTP requests routed through the API hosted locally on my machine. This was all well and good until I added security via user authenticaion into the mix. Luckily *Postman* allows for the use of tokens when sending HTTP requests. I used *JSON Web Token* for authentication and it was a simple matter of pasting in the API's token output upon a successful login into *Postman* to add authentication to my testing.
Manual testing is as simple as it sounds—I would manually manipulate things in the site and check consoles/the hosted DB to ensure things behaved in the expected way.

## Reflection
This course has helped me tremendously in understanding the field of web dev and what it means to be a 'full-stack' developer—a role I wouldn't mind filling in the future. This course has been very exciting and I hope to be able to apply what I've learned in my future career!
