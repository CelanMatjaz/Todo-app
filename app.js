const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const TodoModel = require('./TodoModel');

mongoose.connect('mongodb://localhost/testDB', { useNewUrlParser: true });

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.static('./client/build'));

PORT = 2000;

app.listen(PORT, () => {
	console.log(`Server started\nListening on port ${PORT}`);
});

mongoose.connection.once('open', () => {
	console.log('Connection established');
}).on('error', error => {
	console.log('Connection error:', error);
});


//Sends todos
app.get('/todos', (req, res) => {
	TodoModel.find((err, docs) => {
		if(err){
			res.json({error: 'Error with getting todos'});
			throw err;
		}
		else{
			res.json(docs);
			console.log('Sent todos');
		}
	});
});

//Adds todo
app.post('/add-todo', (req, res) => {
	if(!req.body) {
		res.json({ error: 'Todo cannot be empty' });
		return;
	}
	
	const todo = new TodoModel({
		task: req.body.task,
		done: false
	});

	todo.save((err) => {
		if(err){
			res.json({ error: 'Error saving todo' });
			throw err;
		}
		res.json({ todo });
		console.log('New todo added');
	});

	
});

//Deletes todo in db
app.delete('/delete-todo', (req, res) => {
	TodoModel.findByIdAndDelete(req.body.id, (err) => {
		if(err){
			res.json({ error: 'Error deleting todo' });
			throw err;
		}
		else{
			res.json({});
			console.log('Deleted todo');
		}
	});
});

//Inverts done property
app.put('/mark-todo', (req, res) => {
	if(req.body){
		TodoModel.findByIdAndUpdate(req.body.id, { done: req.body.newState }, (err, doc) => {
			if(err){
				res.json({ error: 'Error marking/unmarking todo' });
				throw err;
			}
			else{
				res.json({});
				console.log('Changed done property of a todo');
			}
		});
	}
	else{
		res.json({ error: 'No ID and/or state submited' });
	}	
});

