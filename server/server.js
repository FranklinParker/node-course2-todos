var express = require('express');
var bodyParser = require('body-parser');

var {userDatabase} = require('../models/User');
var {TodoModel} = require('../models/Todo');

const database = require('../database/mongooseDb');

database.connectToDb();

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new TodoModel({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/todos', (req, res) => {
    TodoModel.find({}).then((todos) => {
        res.send({todos});
    }, (error) => res.status(400).send(error));

});

app.post('/user', (req, res) => {
    userDatabase.saveUser(req.body.email)
        .then((doc) => {
            res.send(doc);
        }, (err) => {
            res.status(400).send(err);
        });


});
app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};