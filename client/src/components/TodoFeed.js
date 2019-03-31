import React, { Component } from 'react';

//Components
import Todo from './Todo';
import AddTodo from './AddTodo';
import ErrorMessage from './ErrorMessage';

class TodoFeed extends Component {
	state = {
		todos: [],
		error: null
	}

	componentDidMount(){
		this.fetchTodos();
	}

	handleSubmit = task => {
		fetch('http://localhost:2000/add-todo', {
			method: 'POST',
			mode: 'cors',
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(task)
		})
		.then(res => res.json())
		.then(data => {
			if(!data.error){
				this.fetchTodos();
			}
			else{
				this.setState({ error: data.error });
			}			
		})
		.catch(error => {
			console.log(error);
			this.setState({ error: 'Could not connect to server' });
		});
	}

	handleDelete = id => {
		fetch('http://localhost:2000/delete-todo', {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ id })
		})
		.then(res => res.json())
		.then(data => {
			if(!data.error){
				this.fetchTodos();
			}
			else{
				this.setState({ error: data.error });
			}			
		})
		.catch(error => {
			console.log(error);
			this.setState({ error: 'Could not connect to server' });
		});
	}

	changeState = todo => {
		fetch('http://localhost:2000/mark-todo', {
			method: 'PUT',
			mode: 'cors',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ 
				id: todo._id,
				newState: !todo.done  
			})
		})
		.then(res => res.json())
		.then(data => {
			if(!data.error){
				this.fetchTodos();
			}
			else{
				this.setState({ error: data.error });
			}			
		})
		.catch(error => {
			console.log(error);
			this.setState({ error: 'Could not connect to server' });
		});
	}

	fetchTodos = () => {
		fetch('http://localhost:2000/todos')
		.then(res => res.json())
		.then(todos => {
			this.setState({ todos, error: null });
		})
		.catch(error => {
			console.log(error);
			this.setState({ error: 'Could not connect to server' });
		});
	}

	render() {
		const todos = this.state.todos.map(todo => 
			<Todo key={ todo._id } handleDelete={ this.handleDelete } changeState={ this.changeState } todo={ todo }/>
		);

		return (
			<div className="todo-feed">
				{ this.state.error ? <ErrorMessage error={this.state.error} /> : '' }
				<AddTodo handleSubmit={this.handleSubmit}/>
				{ todos.length > 0 ? todos : 'No todos to display' }
			</div>
		);
	}
}

export default TodoFeed;