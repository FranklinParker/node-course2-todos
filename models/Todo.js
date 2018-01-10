const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text: {
        type: String,
        required: [true, ' text is required.'],
        minlength: [5, 'must be at least 5 chars'],
        maxlength:[40,'must no longer than 20 chars'],
        trim:true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports.TodoModel = Todo;

