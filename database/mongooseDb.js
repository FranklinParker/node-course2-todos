const mongoose = require('mongoose');

const config = require("../config/config");
const dbUrl = process.env.MONGODB_URI || config.mongooseDBUrl;
console.log('db connection:', dbUrl);

function connectToDb() {
    var promiseLib =  global.Promise;

    mongoose.Promise = global.Promise;
    var mongoDB = mongoose.connect(dbUrl, {
        useMongoClient: true,
        promiseLibrary: promiseLib // Deprecation issue again
    });
    mongoDB
        .then(function (db) {
            console.log('Mongodb has been connected');
        }).catch(function (err) {
        console.log('Error while trying to connect with mongodb');
        throw err;
    });


}

module.exports.connectToDb = connectToDb;



