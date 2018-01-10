//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const objectId = new ObjectID();
console.log('objectId:' + objectId);

const url = 'mongodb://localhost:27017';
var connect = (url, callback) => {
    MongoClient.connect(url, function (err, client) {
        if (err) {
            return console.log('error connecting ', err);

        }
        console.log('connected to mongo');
        callback(err, client);

    });

}

var findOneToDoUpdate = (id) => {
    connect(url, (err, client) => {
        client.db('TodosApi').collection('Todos').findOneAndUpdate({_id: new ObjectID(id)}, {
            $set: {completed: true}
        },{ returnOriginal: false}).then((results)=> console.log(results));
    });
}


var findOneUserUpdate = (id) => {
    connect(url, (err, client) => {
        client.db('TodosApi').collection('Users').findOneAndUpdate({_id: new ObjectID(id)}, {
            $set: {name: 'Jill'},$inc:{age:1}
        },{ returnOriginal: false}).then((results)=> console.log(results));
    });
}

findOneToDoUpdate('5a541ddf5a7acd97222be50e');
findOneUserUpdate('5a52972edd158a92b7d8bce3');
