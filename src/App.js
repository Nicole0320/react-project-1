import React, { Component } from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
import './../public/iconfont/iconfont.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import {getCurrentUser} from './leancloud';
import {signOut} from './leancloud';
import {loadList} from './leancloud';
import {saveListTable} from './leancloud';
import {updateListTable} from './leancloud';
import copyByJSON from './copyByJSON';
import TodoGroup from './TodoGroup';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: getCurrentUser()||{},
      newTodo: '',
      groups: [],
      currentGroup: '',
      todoList: []
    }
  }

  // 初始化加载列表
  componentWillMount(){
    if(this.state.user.id){
      this.initTodoList.call(this);
    }
  }

  initTodoList(){
    function success(list){
      let stateCopy = copyByJSON(this.state);
      stateCopy.todoList = list;

      list.forEach(function(element) {
        if(stateCopy.groups.indexOf(element.group) === -1){
          stateCopy.groups.push(element.group);
        }
      }, this);
      stateCopy.currentGroup = stateCopy.groups[0];

      this.setState(stateCopy);

      console.log(this.state.currentGroup);
    }

    function error(){}
    loadList(this.state.user.id, success.bind(this), error);
  }

  render(){
    let todos = this.state.todoList
      .filter((item)=>item.group===this.state.currentGroup)
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
        <div className="memu"><i className="iconfont icon-caidan"></i>
          <h1>{this.state.user.username||'我'}的待办
            {this.state.user.id ? <button onClick={this.signOut.bind(this)}>退出登录</button> : null}
          </h1>
          <TodoGroup groups={this.state.groups}
            onSwitch={this.switchGroup.bind(this)}/>
        </div>
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

  switchGroup(desGroup){
    let stateCopy = copyByJSON(this.state);
    stateCopy.currentGroup = desGroup;
    this.setState(stateCopy);
    console.log(this.state.currentGroup);
  }

  signOut(e){
      signOut();
      let stateCopy = copyByJSON(this.state);
      stateCopy.user = {};
      stateCopy.todoList = [];
      this.setState(stateCopy);
  }

  onSignUpOrSignIn(user){
    let stateCopy = copyByJSON(this.state);
    stateCopy.user = user;
    this.setState(stateCopy);
    this.initTodoList.call(this);
  }

  componentDidUpdate(){
  }

  addTodo(value){
    var newItem = {
      id: null,
      title: value,
      status: '',
      deleted: false,
      group: this.state.currentGroup
    };

    function success(num){
      newItem.id = num;
      this.state.todoList.unshift(
        newItem
      );
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      });
    }

    function error(){}

    saveListTable(newItem,this.state.user,success.bind(this),error);

  }

  delete(e, todo){
    todo.deleted = true;
    this.setState(this.state);
    updateListTable(this.state.user, todo.id, 'deleted', true);
  }

  toggle(e,todo){
    todo.status = todo.status === 'completed' ? '' : 'completed';
    this.setState(this.state);
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
