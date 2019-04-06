const mongoose = require('mongoose');


const connect = () => {
    mongoose.connect('mongodb://localhost:27017/collapser', { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('connected');
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

module.exports = { connect }
