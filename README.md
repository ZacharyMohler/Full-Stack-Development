# CS-465

## Architecture
The Travlr application makes use of two different methods for displaying the front-facing content.

### Main Site
The main site is a traditional webpage rendered using express and handlebars. Navigating through the site requires a new page to load which is done through injection of HTML through express and using templates created in handlebars. 
### Administrator Site
The administrator site is an angular-run SPA. Once the admin user connects to the site, they are able to navigate quickly and with no delay. 

### Backend
The backend uses MongoDB because it's data is stored as BSON, which translates well to JSON and JavaScript—which this application makes heavy use of in API and admin SPA implementation. 

## Functionality
How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.


## Testing
Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.


## Reflection
How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?
