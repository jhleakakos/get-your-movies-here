const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');

app.use(express.static(__dirname + '/public'));

app.listen(3000, () => console.log('express listening on port 3000'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'views') });
})









/*
REST routes

GET     /                 landing page

GET     /movies           get main page listing of movies
POST    /movies           add movie
GET     /movies/new       form to add a new movie
GET     /movies/:id       show page for individual movie
PATCH   /movies/:id       edit movie
GET     /movies/:id/edit  form to edit to movie
DELETE  /movies/:id       delete movie

GET     /shows            get main page listing of tv shows
POST    /shows            add tv show
GET     /shows/new        form to add new tv show
GET     /shows/:id        show page for individual tv show
PATCH   /shows/:id        edit show
GET     /shows/:id/edit   form to edit tv show
DELETE  /shows/:id        delete show

POST    /review           add review
DELETE  /review           delete review

POST    /comment          add comment
DELETE  /comment          delete comment

GET     /login            login page
GET     /logout           log out user
GET     /register         form to register user account
POST    /register         add user

GET     /user             main landing page for users
GET     /user/:id         show page for individual user
POST    /user/:id         edit user
GET     /user/:id/edit    form to edit user

GET     /admin            admin page

*/
