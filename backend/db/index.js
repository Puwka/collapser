const mongoose = require('mongoose');
const config = require('../../config');


const connect = () => {
    const mongoHost = process.env.ENV === 'production' ? config.production.database.host : config.development.database.host;
    console.log(mongoHost)
    mongoose.connect(`mongodb://${mongoHost}:27017/collapser`, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connectiodsfn error:'));
    db.once('open', () => {
        console.log('connected mongodb');
    });
};

const userSchema = new mongoose.Schema({
    nickname: String,
    password: String,
    level: {
        type: Number,
        default: 1
    }
});

const user = mongoose.model('User', userSchema);

module.exports = { connect };
