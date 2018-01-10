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

var addToDo = (todo) => {
    connect(url, (err, client) => {
        client.db('TodosApi').collection('Todos').insertOne(todo,
            (err1, result) => {
                console.log('result' + JSON.stringify(result.ops, null, 2));
                client.close();
            });
    });
}

var addUser = (user) => {
    connect(url, (err, client) => {
        client.db('TodosApi').collection('user').insertOne(user,
            (err1, result) => {
                console.log('result' + JSON.stringify(result.ops, null, 2));
                client.close();
            });
    });
}

var getToDos = () => {
    connect(url, (err, client) => {
        return client.db('TodosApi').collection('Todos').find().toArray().then((docs) => {
            console.log(JSON.stringify(docs, null, 2));
            client.close();
        }, (error) => {

        });
    });

}


var getOpenToDo = () => {
    connect(url, (err, client) => {
        return client.db('TodosApi').collection('Todos').find({completed: true}).toArray().then((docs) => {
            console.log('Open toDos:', JSON.stringify(docs, null, 2));
            client.close();
        }, (error) => {

        });
    });

}

var getTodoById = (id) => {
    connect(url, (err, client) => {
        return client.db('TodosApi').collection('Todos').find({_id: new ObjectID(id)}).toArray().then((docs) => {
            console.log('found by Id :', JSON.stringify(docs, null, 2));
            client.close();
        }, (error) => {

        });
    });

}


var getTodoCount = () => {
    connect(url, (err, client) => {
        return client.db('TodosApi').collection('Todos').find().count().then((count) => {
            console.log(`Found ${count} toDos`);
            client.close();
        }, (error) => {

        });
    });

}
var addManyToDos = (number) => {
    for (var i = 0; i < number; i++) {
        addToDo({
            "text": "Walk Dog" + i,
            "completed": false
        });
    }
}
var findRangeToDos = (offSet, number) => {
    connect(url, (err, client) => {
        client.db('TodosApi').collection('Todos').find().skip(offSet).limit(number)
            .sort({text: 1})
            .toArray()
            .then((docs) => {
                console.log('Limit:' + JSON.stringify(docs, null, 2));
                client.close();
            }, (error) => {
                console.log(error);

            })
    });
}

var findUserByName = (name) => {
    connect(url, (err, client) => {
        client.db('TodosApi').collection('user')
            .find({name: name})
            .toArray()
            .then((docs) => {
                console.log(`user for name ${name} :` + JSON.stringify(docs, null, 2));
                client.close();
            }, (err) => {
            });
    });

}


var deleteByText = (text) => {
    connect(url, (err, client) => {
        client.db('TodosApi').collection('Todos').deleteMany({text: text}).then((results) => {
            console.log('results:', results.result);
            client.close();
        });

    });

}


var deleteOneText = (text) => {
    connect(url, (err, client) => {
        client.db('TodosApi').collection('Todos').deleteOne({text: text}).then((results) => {
            console.log('results:', results.result);
            client.close();
        });

    });

}

var findByIdDelete= (id) =>{
    connect(url, (err, client) => {
        client.db('TodosApi').collection('Todos').findOneAndDelete({completed: false}).then((results) => {
            console.log('results:', results);
            client.close();
        });

    });

}



// deleteByText('Walk Dog');
// deleteByText('Walk Dog5');
// findByIdDelete(false);
//getTodoCount();

//findRangeToDos(0, 2);
//findUserByName('joe');
//addManyToDos(20);
//getTodoById('5a5417df1b9ee9962ea5fc6d');
//getToDos();
//getOpenToDo();


