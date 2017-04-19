import React, { Component } from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import * as localStorage from './localStore'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      newTodo: '',
      todoList: localStorage.load('todoList') || []
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
        <h1>我的待办</h1>
        <div className='inputWrapper'>
          <TodoInput content={this.state.newTodo} 
            onChange={this.changeTitile.bind(this)}
            onSubmit={this.addTodo.bind(this)}/>
        </div>
        <ol className="todoList">
          {todos}
        </ol>
      </div>
    );
  }

  componentDidUpdate(){
    localStorage.save('todoList', this.state.todoList);
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
