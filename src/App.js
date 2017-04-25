import React, { Component } from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      newTodo: '',
      todoList: []
    }
  }

  render() {
    let todos = this.state.todoList
    .filter((item)=>!item.deleted)
    .map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem todo={item} onToggle={this.toggle.bind(this)}
            onDelete={this.delete.bind(this)}  id={item.id}/>
        </li>
        )
    });

    return (
      <div className="App">
        <h1>{this.state.user.username||'我'}的待办</h1>
        <div className='inputWrapper'>
          <TodoInput content={this.state.newTodo} 
            onChange={this.changeTitile.bind(this)}
            onSubmit={this.addTodo.bind(this)}/>
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? null : <UserDialog onSignUp={this.onSignUp.bind(this)}/>}
      </div>
    );
  }

  onSignUp(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.user = user;
    this.setState(stateCopy);
  }

  componentDidUpdate(){
  }

  addTodo(event){
    this.state.todoList.push({
      id: this.state.todoList.length,
      title: event.target.value,
      status: null,
      deleted: false
    });
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    });
  }

  delete(e, todo){
    todo.deleted = true;
    this.setState(this.state);
  }

  toggle(e,todo){
    todo.status = todo.status === 'completed' ? '' : 'completed';
    this.setState(this.state);
  }

  changeTitile(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    });
  }
}

export default App;
