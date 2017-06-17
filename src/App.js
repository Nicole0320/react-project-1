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
      newGroup: '',
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
        if(element.group && stateCopy.groups.indexOf(element.group) === -1){
          stateCopy.groups.unshift(element.group);
        }
      }, list);

      stateCopy.currentGroup = stateCopy.groups[0];
      this.setState(stateCopy);
    }

    function error(){
      this.addTodo('null', true);
      let stateCopy = copyByJSON(this.state);
      stateCopy.currentGroup = '我的待办';
      this.addGroup.call(this, '我的待办');
      this.setState(stateCopy);
      this.initTodoList.call(this);
    }

    loadList(this.state.user.id, success.bind(this), error.bind(this));
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
        <div className="aside">
          <div className="header">
            <div className="iconfont icon-caidan"></div>
            <p>{this.state.user.username||'我'}的待办
            </p>
            {this.state.user.id ? <button onClick={this.signOut.bind(this)}>退出</button> : null}
          </div>
          <TodoInput content={this.state.newGroup} 
            onChange={this.changeGroupTitile.bind(this)}
            onSubmit={this.addGroup.bind(this)}
            placeHolder={"+ 新建分组..."}/>
          <TodoGroup groups={this.state.groups}
            onSwitch={this.switchGroup.bind(this)}/>
        </div>
        <div className="main">
          <h1 className="header">{this.state.currentGroup}</h1>
          <div className='inputWrapper'>
            <TodoInput content={this.state.newTodo} 
              onChange={this.changeTitile.bind(this)}
              onSubmit={this.addTodo.bind(this)}
              placeHolder={"+ 添加待办事项..."}/>
          </div>
          <ol className="todoList">
            {todos}
          </ol>
          {this.state.user.id ? null : <UserDialog
              onSignUp={this.onSignUpOrSignIn.bind(this)}
              onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
        </div>
      </div>
    );
  }

  addGroup(newGroup){
    let stateCopy = copyByJSON(this.state);
    stateCopy.groups.push(newGroup);
    stateCopy.currentGroup = newGroup;
    stateCopy.newGroup = '';
    this.setState(stateCopy);
    
    //在新分组下添加一个不可见的新事项，以保证在新的分组添加到远程数据库
    this.addTodo('test', true);
  }

  switchGroup(desGroup){
    let stateCopy = copyByJSON(this.state);
    stateCopy.currentGroup = desGroup;
    this.setState(stateCopy);
  }

  signOut(e){
      signOut();
      let stateCopy = copyByJSON(this.state);
      stateCopy.user = {};
      stateCopy.todoList = [];
      stateCopy.groups = [];
      stateCopy.currentGroup = '';
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

  addTodo(value, isDeleted){
    var newItem = {
      id: null,
      title: value,
      status: '',
      deleted: isDeleted||false,
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

  changeGroupTitile(event){
    this.setState({
      newGroup: event.target.value,
      currentGroup: event.target.value
    });
  }
}

export default App;
