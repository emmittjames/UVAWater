# [UVA Water](https://uvawater.net)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
#### Website link: [uvawater.net](https://uvawater.net)
This website will allow users to view ratings for all of the water foutnains around grounds at UVA by clicking on markers displayed on a map. Users can also submit their own ratings via a rating form or any other kind of feedback via a contact form.
	
## Technologies
Project created with:
* JavaScript
* HTML5
* CSS3
* Node.js
* Express.js
* MySQL
* [Google Maps API](https://developers.google.com/maps)

Project hosted with:
* [Netlify](https://www.netlify.com) - Frontend hosting
* [Cyclic](https://www.cyclic.sh) - Backend hosting
* [Planetscale](https://planetscale.com) - MySQL database hosting

## Cloning
1. Clone the repository
2. Download and set up MySQL on your machine and create a database
3. Create a .env file and put it into the root directory
4. Put this code into the .env file using your MySQL credentials:
```
DATABASE_URL={
    host: 'localhost',
    user: 'Your MySQL username',
    password: 'Your MySQL password',
    database: 'Your MySQL database name'
}
BACKEND_URL='https://localhost:3000'
```
5. Everything should be up and running if you go to https://localhost:3000
