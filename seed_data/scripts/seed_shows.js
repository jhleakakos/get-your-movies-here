const mongoose = require('mongoose');
const Show = require('../../models/show');
const showData = require('../data/shows.json');
require('dotenv').config();

mongoose.connect(`mongodb://${process.env.DB_CONNECTION}:27017/getyourmovieshere`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('seeds connection open'))
    .catch(e => console.log(e));

const seedShows = async () => {
    await Show.deleteMany();
    for (let show of showData) {
        const newShow = new Show({
            tvmazeID: show.show.id,
            name: show.show.name,
            genres: show.show.genres,
            //logic is if image is null, then return null
            //else if medium is not null, then return medium
            //else if original is not null, return original
            //else return null
            poster: (show.show.image === null ? null :
                (show.show.image.medium !== null ? show.show.image.medium :
                    (show.show.image.original !== null ?
                        show.show.image.original : null))),
            summary: show.show.summary || 'needs a description',
            inventory: Math.floor(Math.random() * 6)
        });
        await newShow.save();
    }
}

seedShows().then(() => mongoose.connection.close());
