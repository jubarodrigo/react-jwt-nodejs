var config = require('../config');
var MongoClient = require('mongodb').MongoClient;

var db;
var collection;
MongoClient.connect(config.MONGO_URL, (err, database) => {
    if (!err) {
        console.log('Connection estabelished do MongoDB');
        db = database;
        collection = db.collection('users');
    } else {
        console.log('Not possible to estabelished the connection to MongoDB');
    }
});

module.exports = {
    register: (data, handler) => {

    }
}