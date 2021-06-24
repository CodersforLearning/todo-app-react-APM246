/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import React from 'react';
import { render } from '@testing-library/react';
import firebase from "firebase/app"
import "firebase/analytics"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDqqHDbwML8Q-5trbu-he4bgSvAOH6USE4",
  authDomain: "todo-app-f9f30.firebaseapp.com",
  projectId: "todo-app-f9f30",
  storageBucket: "todo-app-f9f30.appspot.com",
  messagingSenderId: "769594505515",
  appId: "1:769594505515:web:f29c98515ac036fe606d6e",
  measurementId: "G-XV346X9JN4"
}

firebase.initializeApp(firebaseConfig);

let firebaseui = require('firebaseui');
let ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
});

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      document.getElementById('root').style.display = "block";
      document.getElementById('login').style.display = 'none';
      return true;
    }
  }
}

ui.start('#firebaseui-auth-container', uiConfig);

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

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {className: '', completed: false}
    this.handleDeletion = this.handleDeletion.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleDeletion() {
    this.props.handleDoubleClick(this.props.name);
  }

  handleClick() {
    if (this.state.completed) {
      this.setState({className: '', completed: false})
    }

    else {
      this.setState({className: 'task-complete', completed: true})
    }
  }

  render() {
    return (
      <li className={this.state.className}> 
        <span onDoubleClick={this.handleDeletion}>
          {this.props.name} 
        </span> 
        <input type="checkbox" onClick={this.handleClick} /> 
      </li>
    );
  }
}

class TaskList extends React.Component {

  render() {
    return (
      <ol> 
          {
            // need to come up with proper key system
            this.props.tasks.map((task, index) => 
              <ListItem name={task} key={index} handleDoubleClick={this.props.handleDoubleClick}/>
            )
          }
      </ol>
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
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    let updated_tasks = this.state.tasks.concat(this.state.value);
    this.setState({tasks: updated_tasks, value: ''});
    e.preventDefault();
  }

  handleDoubleClick(task) {
    let index = this.state.tasks.indexOf(task);
    let tasks_copy = this.state.tasks.slice();
    tasks_copy.splice(index, 1);
    this.setState({tasks: tasks_copy})
    
  }

  render() {
    return (
      <div id="main-app" className="App row">
        <div className="col-6 left d-flex align-items-center justify-content-center">
          <div className="row row-cols-1">
            <div className="description col">
              <p> To add tasks to your todo list, enter them in the text box and press
                submit. To mark tasks as complete, click the checkbox beside them. To delete
                tasks, double click on the task. 
              </p>
            </div>
            <div className="create-tasks col d-flex align-items-center justify-content-center">
              <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <input className="submit" type="submit" value="submit" />
              </form>
            </div>
          </div>
        </div>
        <div className="col-6 right">
          <h1 className="todo-header"> Todo List </h1>
          <TaskList tasks={this.state.tasks} handleDoubleClick={this.handleDoubleClick}/>
        </div>
      </div>
    );
  }
}

export default App;
