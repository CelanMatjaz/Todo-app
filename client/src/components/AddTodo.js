import React, { Component } from 'react';

class AddTodo extends Component {
	state = {
		task: ''
	}

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	handleSubmit = e => {
		e.preventDefault();
		if(this.state.task.length > 0){
			this.props.handleSubmit(this.state);
			this.setState({ task: '' })
		}
	}

	render() {
		return (
			<div className="add-todo">
				<form onSubmit={ this.handleSubmit }>
					<input type="text" placeholder="New task" value={ this.state.task } id="task" onChange={ this.handleChange } />
					<button>Add todo</button>
				</form>
			</div>
		);
	}
}

export default AddTodo;