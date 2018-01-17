const express = require('express');
const config = require('../config/config');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');


const lodash = require('lodash');
var {authenticate} = require('./middleware/authenticate');


var {User} = require('../models/User');
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


app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send({error: 'invalid id'});
    }
    var body = lodash.pick(req.body, ['text', 'completed']);
    if (lodash.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completedAt = null;
        body.completed = false;
    }

    TodoModel.findByIdAndUpdate(id, {$set: body}, {new: true})
        .then((todo) => {
            if (!todo) {
                return res.status(404).send({error: 'no update'})
            }
            res.send({todo});
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
    if (!ObjectId.isValid(id)) {
        return res.status(404).send({error: 'invalid id'});
    }

    TodoModel.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({error: 'not find'});
        }
        res.send({todo});
    }, (error) => res.status(400).send({error: ''}));

});


app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    console.log('deleting:' + id);
    if (!ObjectId.isValid(id)) {
        return res.status(404).send({error: 'invalid id'});
    }

    TodoModel.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({error: 'not find'});
        }
        res.send({todo});
    }, (error) => res.status(400).send({error: ''}));

});
app.post('/users', (req, res) => {
    var body = lodash.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {

        res.header('x-auth', token).send(user);
    }).catch((e) => {
        console.log('error', e);
        res.status(400).send(e);
    })
});

app.post('/users/login', (req, res) => {
    var body = lodash.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};