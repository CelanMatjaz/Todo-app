const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Sets default promises
mongoose.Promise = global.Promise;

//Todo schema
const TodoSchema = new Schema({
	task: String,
	done: Boolean
});

//Makes a model
const TodoModel = mongoose.model('todo', TodoSchema);

module.exports = TodoModel;