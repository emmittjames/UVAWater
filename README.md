# [UVA Water](https://uvawater.net)

## Table of contents
* [General Info](#general-info)
* [Technologies](#technologies)
* [Cloning](#cloning)
* [Sample Images](#sample-images)
* [License](#license)

## General Info
#### Website link: [uvawater.net](https://uvawater.net)
#### UVA Water news article: [https://dailyprogress.com/news/uva/new-student-developed-website-lets-you-review-uva-drinking-fountains/article_2a4e5730-a65b-11ed-9514-6f3450e7cd00.html](https://dailyprogress.com/news/uva/new-student-developed-website-lets-you-review-uva-drinking-fountains/article_2a4e5730-a65b-11ed-9514-6f3450e7cd00.html)
This website allows users to view ratings for water foutnains around grounds at UVA by clicking on markers displayed on a map. Users can also submit their own ratings via the rating form or any other kind of feedback via the contact form.
	
## Technologies
Project created with:
* JavaScript
* HTML
* CSS
* Node.js
* Express.js
* PostgreSQL
* [Google Maps API](https://developers.google.com/maps)

Project hosted with:
* [Netlify](https://www.netlify.com) - Frontend hosting
* [Cyclic](https://www.cyclic.sh) - Backend hosting
* [Neon](https://neon.tech/) - PostgreSQL database hosting

## Cloning
1. Clone the repository
2. [Download](https://www.postgresql.org/download/) and install PostgreSQL on your machine with the default port of 5432
3. Create a database in PostgreSQL
4. Create a .env file in the server directory
5. Put the following into the .env file using your PostgreSQL credentials:
```
DATABASE_URL = "postgres://Your_PostgreSQL_username:Your_PostgreSQL_password@localhost:5432/Your_PostgreSQL_database_name"
PORT = "3000"
```
6. Create a .env file in the client directory
7. Put the following into the .env file:
```
BACKEND_URL = "https://localhost:3000"
```
8. Everything should be ready to work on your localhost!

## Sample Images

#### Viewing ratings on the map
<img width="1440" alt="Viewing ratings" src="https://user-images.githubusercontent.com/90576219/216737244-dd2f58f1-1dfe-47fb-bbb1-f2856571b41e.png">

#### Submitting a water fountain rating
<img width="1440" alt="Submitting rating" src="https://user-images.githubusercontent.com/90576219/216737257-750f673f-5447-4047-9f72-cd9d08849670.png">

#### Giving feedback on the site
<img width="1440" alt="Submitting feedback" src="https://user-images.githubusercontent.com/90576219/216737404-2fcf3b53-143b-4d7b-8227-9dcc17d944c9.png">

## License
Distributed under the MIT License. See ```LICENSE``` for more information
