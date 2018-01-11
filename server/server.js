var express = require('express');
var bodyParser = require('body-parser');
var {ObjectId} = require('mongodb');

var {userDatabase} = require('../models/User');
var {TodoModel} = require('../models/Todo');

const database = require('../database/mongooseDb');

database.connectToDb();

var app = express();
const port = process.env.PORT || 3000;
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


app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send({error:'invalid id'});
    }

    TodoModel.findById(id).then((todo) => {
        if(!todo){
            return res.status(404).send({error:'not find'});
        }
        res.send({todo});
    }, (error) => res.status(400).send({error: ''}));

});




app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    console.log('deleting:' + id);
    if(!ObjectId.isValid(id)){
        return res.status(404).send({error:'invalid id'});
    }

    TodoModel.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(404).send({error:'not find'});
        }
        res.send({todo});
    }, (error) => res.status(400).send({error: ''}));

});



app.post('/user', (req, res) => {
    userDatabase.saveUser(req.body.email)
        .then((doc) => {
            res.send(doc);
        }, (err) => {
            res.status(400).send(err);
        });


});
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};