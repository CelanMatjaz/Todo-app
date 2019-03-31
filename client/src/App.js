import React, { Component } from 'react';

//CSS
import './App.css';

//Components
import TodoFeed from './components/TodoFeed';

class App extends Component {
	render() {
		return (
			<div className="App container">
				<h1>Todo app</h1>
				<TodoFeed/>
			</div>
		);
	}
}

export default App;
