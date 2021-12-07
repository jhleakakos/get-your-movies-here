# Get Your Movies Here

Movie and TV show rental app. Create an account and rent some entertainment.

<p style="display: flex; justify-content: space-around;">
<img src="readme_img/movie_home_page.png" width="47%" height="auto" alt="Movie home page">
<img src="readme_img/movie_show_page_not_logged_in.png" width="47%" height="auto" alt="Movie show page for individual movie">
</p>

<p style="display: flex; justify-content: space-around;">
<img src="readme_img/register_page.png" width="47%" height="auto" alt="Movie show page for individual movie">
<img src="readme_img/movie_show_page_logged_in_admin.png" width="47%" height="auto" alt="Movie show page for individual movie">
</p>

This is a sample node app that allows users to rent movies and TV shows and leave reviews.

The tech stack is Node, Express, and MongoDB on the back end with [Bootstrap](https://getbootstrap.com) on the front end. It uses [Mongoose](https://mongoosejs.com/) as the ODM, [EJS](https://ejs.co/) for templating, and [Passport](http://www.passportjs.org/) for authentication.

## Manual Dependencies

You will need to install:

- [Node](https://nodejs.org)
- [NPM](https://www.npmjs.com) (if you didn't install with Node)

If you are installing the app locally

- [MongoDB](https://www.mongodb.com)
- Install project dependencies with NPM by running the following command in the root directory
```
npm install
```

Nodemon is installed as a local development dependency.

If you are running the app with Docker

- [Docker](https://www.docker.com/)

## .env file

The dotenv package uses a file named .env in the root of the project. This file is not under version control, so you will need to create it and add the following three environment variables:

- API_KEY: this is the key to access the TMDb movie API. You can get this key by signing up for an account and requesting an API key at 
[The Movie Database](https://www.themoviedb.org/)

```
echo 'API_KEY=put_your_tmdb_api_key_here' >> .env
```

- SESSION_SECRET: this is a random string that you pass into the secret option for the Express Session middleware in app.js

```
echo 'SESSION_SECRET=put_your_session_secret_string_here' >> .env
```

- DB_CONNECTION sets part of the MongoDB connection string in app.js. Set this value to 'localhost' if you are running the app locally, and set it to 'mongo' if you are running the app in Docker

```
echo 'DB_CONNECTION=mongo' >> .env
```

## Running the App Locally

Before starting the app, make sure the MongoDB service is running.

Once the MongoDB service is up, use
```
npm run nodemon
```
in the app directory to start the app.

Open a web browser and go to localhost:3000 to access the app.

## Running the App with Docker

In the root of the repository, run

```
docker-compose up -d
```

Open a web browser and go to localhost:3000 to access the app.

When you are done, run

```
docker-compose down
```

to stop and clean up the containers.

## Database Setup

This project uses five collections:

- moviegenres
- movies
- reviews
- shows
- users

You can view more info about each of these in the models directory.

If this is your first time running the app, you should seed the database. The /seed_data/data directory has starter JSON files that you can use to seed the database.

You need to populate movie genres in order for movie functionality to work in the app.

You will need the Mongoose package installed if you want to run the seed scripts

```
npm install mongoose
```

In /seed_data/scripts, you have

- seed_all.js: you can comment/uncomment and see all of the logic in one file
- seed_movie_genres.js: seed only movie genres
- seed_movies.js: seed only movies
- seed_shows.js: seed only shows

You will populate users and reviews from the app interface.

Make sure the MongoDB service is running and then call the script with Node

```
node script_you_want_to_run.js
```

See the [Admin Users](#admin-users) section for adding movies and shows through the app interface.

## Accessing Mongo Shell

If you installed the Mongo shell locally, you can access the running MongoDB instance at the terminal with

```
mongo
```

If you did not install the Mongo shell locally, you can connect to the MongoDB instance at the terminal through the MongoDB container with 

```
docker container exec -it mongo mongo
```

## Admin Users

The app has no users in the database by default. To create an admin account:

- run the app
- create a standard user with the Register feature
- run the Mongo shell per the instructions in the last section

In the MongoDB shell:

- switch to the app database
```
use getyourmovieshere
```

- confirm you have the right user
```
db.users.findOne({"username": <user>})
``` 

Users are set with the role of customer by default. To promote a user from a customer to an administrator (role of "admin"):

```
db.users.updateOne({"username": <user>}, {$set: {"role": "admin"}})
```

\* substitute desired username in place of <user>

Once you have an administrator account, you can use the app interface to change other users to administrators or customers.

<p align="center"><img src="readme_img/admin_panel.png" width="80%" height="auto" alt="Admin panel"></p>

You reach this admin panel by clicking on your username in the navbar and clicking on the admin panel button in the upper-left. You can use this to change the role for other users.

<p align="center"><img src="readme_img/add_movie.png" width="80%" height="auto" alt="Page to add new movies"></p>

Admins have two extra options in the navbar: Add Movie and Add TV Show. You can add new movies and TV shows through these pages. The search functionality populates results from the corresponding APIs with AJAX.

# APIs

Movie data and data sets come from the [API](https://developers.themoviedb.org/3/) from [The Movie Database](https://www.themoviedb.org/). This product uses the TMDb API but is not endorsed or certified by TMDb.

TV data and data sets come from the [API](https://www.tvmaze.com/api) from [TVmaze](https://www.tvmaze.com). The data is licensed under Creative Commons license [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0). Please note that the license for TVmaze data is different than that for the app. Please take appropriate measures to follow the licensing for TVmaze data.
