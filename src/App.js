import React, { Component } from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import {getCurrentUser} from './leancloud';
import {signOut} from './leancloud';
import {loadList} from './leancloud';
import {saveListTable} from './leancloud';
import {updateListTable} from './leancloud';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: getCurrentUser()||{},
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
        <h1>{this.state.user.username||'我'}的待办
          {this.state.user.id ? <button onClick={this.signOut.bind(this)}>退出登录</button> : null}
        </h1>
        <div className='inputWrapper'>
          <TodoInput content={this.state.newTodo} 
            onChange={this.changeTitile.bind(this)}
            onSubmit={this.addTodo.bind(this)}/>
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? null : <UserDialog
            onSignUp={this.onSignUpOrSignIn.bind(this)}
            onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
      </div>
    );
  }

  signOut(e){
      signOut();
      let stateCopy = JSON.parse(JSON.stringify(this.state));
      stateCopy.user = {};
      this.setState(stateCopy);
  }

  onSignUpOrSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.user = user;
    this.setState(stateCopy);
  }

  componentDidUpdate(){
  }

  addTodo(event){
    var newItem = {
      id: null,
      title: event.target.value,
      status: '',
      deleted: false
    };

    function success(num){
      console.log(this);
      newItem.id = num;
      this.state.todoList.push(
        newItem
      );
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      });
    }

    function error(){}

    console.log('要调用save了')
    saveListTable(newItem,this.state.user,success.bind(this),error);

  }

  delete(e, todo){
    todo.deleted = true;
    this.setState(this.state);
    console.log('调用delete：');
    console.log(todo);
    updateListTable(this.state.user, todo.id, 'deleted', true);
  }

  toggle(e,todo){
    todo.status = todo.status === 'completed' ? '' : 'completed';
    this.setState(this.state);
    console.log('调用toggle：');
    console.log(this.state.user);
    updateListTable(this.state.user, todo.id, 'status', todo.status);
  }

  changeTitile(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    });
  }
}

export default App;
