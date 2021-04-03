const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');

app.use(express.static(__dirname + '/public'));

app.listen(3000, () => console.log('express listening on port 3000'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/shows', (req, res) => {
    res.send('lookin\' at some tv shows');
})

app.get('/shows/new', (req, res) => {
    res.send('render form for new shows')
})

app.get('/shows/:id', (req, res) => {
    res.send('show page for individual tv show');
})

app.get('/shows/:id/edit', (req, res) => {
    res.send('form to edit tv show');
})





/*
Database Setup

store certain fields in local db to handle inventory and user info
pull from api based on data stored in local db


need to store locally:

show id
show name
show genres
url to show poster
show summary

with these data points stored locally, we can display this info along with whatever else we gather for the app without hitting the api
since we link to the show poster url instead of getting that from the api, we can still cut down on api calls



json schema

{
    score: float,
    show: {
        id: int,
        url: tvmaze url string,
        name: string,
        type: string,
        language: string,
        genres: [string],
        status: string,
        runtime: int,
        premiered: string representation of date,
        officialSite: url string,
        schedule: {
            time: string representation of time,
            days: [days of week as string]
        },
        rating: {
            average: float
        },
        weight: int,
        network: {
            id: int,
            name: string,
            country: {
                name: string,
                code: string,
                timezone: string
            },
        },
        webChannel: something,
        externals: {
            tvrage: int,
            thetvdb: int,
            imdb: string
        },
        image: {
            medium: url string,
            original: url string
        },
        summary: string,
        updated: int but probably datetime representation,
        _links: {
            self {href: url},
            previousepisode: {href: string}
        }
    }
}
*/




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
