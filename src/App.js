/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: 'white'};
    this.changeColor = this.changeColor.bind(this);
  }

  changeColor() {
    this.setState({color: 'red'});
  }

  render() {
    return (
      // double curly braces needed
      <p style={{color: this.state.color}} onClick={this.changeColor}>
        {this.props.name}
      </p>
    );
  }
}

function ListItem(props) {
  return <li> {props.name} </li>
}

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ul> 
          {
            // need to come up with proper key system
            this.props.tasks.map((task, index) => 
              <ListItem name={task} key={index} />
          )}
      </ul>
    );
  }
}

// component function
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', tasks: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    let updated_tasks = this.state.tasks.concat(this.state.value);
    this.setState({tasks: updated_tasks});
    e.preventDefault();
    console.log(this.state.tasks.toString());
  }

  render() {
    return (
      <div className="App row">
        <div className="col-6 left">
          <div className="task-adder">
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>
        <div className="col-6 right">
          <TaskList tasks={this.state.tasks} />
        </div>
      </div>
    );
  }
}

export default App;
