make readme visually appealing
add code blocks
make gifs

# Get Your Movies Here

Movie and TV show rental app. Create an account and rent some entertainment.

This is a sample node app that allows users to rent movies and TV shows.

## Manual Dependencies

- Node/NPM
- MongoDB

You need to install [Node](https://nodejs.org). You will likely install 
[NPM](https://www.npmjs.com) along with Node, but you can install it separately
if needed. You also need to install [MongoDB](https://www.mongodb.com).

You can use NPM to install the rest of the project dependencies.

Nodemon is installed as a local development dependency.

## Running App

Before running the app, make sure the mongodb service is running. For instance,
on Linux, use `systemctl start mongodb` or `systemctl enable mongodb.`

Once the MongoDB service is up, use `npm run nodemon` in the app directory
to start the app.

## Roles

The app has no users in the database by default. To create an admin account:

- run the app
- create a standard user with the Register feature
- run `mongo` to start the MongoDB shell

In the MongoDB shell:

- run `use getyourmovieshere` to switch to the app database
- \*run `db.users.findOne({"username": *username*})` to confirm you have the right 
user

Users are set with the role of customer by default. To promote a user from a 
customer to an administrator (role of "admin"):

- \*run `db.users.updateOne({"username": *username*}, {$set: {"role": "admin"}})`

Once you have an administrator account, you can use the app interface to 
change other users to administrators or customers.

\* substitute desired username in place of *username*

## .env file

The dotenv package uses the .env file in the root of the project. This file 
needs two environment variables

- API_KEY: this is the key to access the TMDb movie API; you can get this key
by signing up for an account and requesting an API key at 
[The Movie Database](https://www.themoviedb.org/)

- SESSION_SECRET: this is a random string that you pass into the secret option
for the express session middleware in app.js

## Database Setup

This project uses five collections:

- moviegenres
- movies
- reviews
- shows
- users

You can view more info about each of these in the models directory.

To populate these collections, except for users and reviews, please see the 
next section.

## Seed Data

The seed_data folder contains starter data and scripts to initially populate 
the database. The seed_all.js script contains all of the other scripts. You can 
comment/uncomment from that file or run each of the other scripts on their own.

## Front End

This app primarily uses [Bootstrap](https://getbootstrap.com) on the front end. 
There are a handful of custom css properties in the public directory.

## Back End

This app uses a Node/Express/MongoDB stack on the back end

# GIFs

- samples

## APIs

Movie data and data sets come from the [API](https://developers.themoviedb.org/3/) from [The Movie Database](https://www.themoviedb.org/). This product uses the TMDb API but is not endorsed or certified by TMDb.

TV data and data sets come from the [API](https://www.tvmaze.com/api) from [TVmaze](https://www.tvmaze.com). The data is licensed under Creative Commons license [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0). Please note that the license for TVmaze data is different than that for the app. Please take appropriate measures to follow the licensing for TVmaze data.
