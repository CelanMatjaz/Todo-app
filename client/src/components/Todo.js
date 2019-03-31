import React from 'react';

const Todo = props => {
	return (
		<div className="todo">
			<div id="text" className={ props.todo.done ? 'done' : '' }onClick={() => props.changeState(props.todo)}>{ props.todo.task }</div>
			<button id="delete" onClick={() => props.handleDelete(props.todo._id)}>Delete</button>
		</div>
	);
};

export default Todo;


