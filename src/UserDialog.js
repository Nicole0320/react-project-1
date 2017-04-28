import React, {Component} from 'react';
import {signUp} from './leancloud';
import {signIn} from './leancloud';
import './UserDialog.css';

export default class UserDialog extends Component{
    constructor(props){
        super(props);
        this.state={
            selected: 'signUp',
            formData: {
                username: '',
                password: ''
            }
        }
    }

    switch(e){
        this.setState({
            selected: e.target.value
        })
    }

    signUp(e){
        e.preventDefault();
        let {username, password} = this.state.formData;
        let success = (user)=>{
            console.log(user);
            this.props.onSignUp.call(null, user);
        }
        let error = (error)=>{
            switch(error.code){
                case 202:
                    alert('用户名已经被占用');
                    break;
                default:
                    alert(error);
                    break;
            }
        }

        signUp(username, password, success, error)
    }

    signIn(e){
        e.preventDefault();
        let {username, password} = this.state.formData;
        let success = (user)=>{
            this.props.onSignIn.call(null, user);
        }
        let error = (error)=>{
            switch(error.code){
                case 210:
                    alert('用户名与密码不匹配');
                    break;
                default:
                    alert(error);
                    break;
            }
        }

        signIn(username, password, success, error);
    }

    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state)); //借用JSON实现深拷贝
        stateCopy.formData[key] = e.target.value;
        this.setState(stateCopy);
    }

    render(){
        let signUpForm = (
            <form className="signUp" onSubmit={this.signUp.bind(this)}>
                <div className="row">
                    <label htmlFor="signup-user-name">用户名</label>
                    <input type="text" id="signup-user-name"
                        value={this.state.formData.username}
                        onChange={this.changeFormData.bind(this, 'username')}/>
                </div>
                <div className="row">
                    <label htmlFor="signup-password">密码</label>
                    <input type="password" id="signup-password"
                        value={this.state.formData.password}
                        onChange={this.changeFormData.bind(this, 'password')}/>
                </div>
                <div className="row action">
                    <button type="submit">注册</button>
                </div>
            </form>
        );
        let signInForm = (
            <form className="signIn" onSubmit={this.signIn.bind(this)}>
                <div className="row">
                    <label htmlFor="signin-user-name">用户名</label>
                    <input type="text" id="signin-user-name"
                        value={this.state.formData.username}
                        onChange={this.changeFormData.bind(this, 'username')}/>
                </div>
                <div className="row">
                    <label htmlFor="signin-password">密码</label>
                    <input type="password" id="signin-password"
                        value={this.state.formData.password}
                        onChange={this.changeFormData.bind(this, 'password')}/>
                </div>
                <div className="row action">
                    <button type="submit">登录</button>
                </div>
            </form>
        );

        return (
        <div className="UserDialog-Wrapper">
            <div className="UserDialog">
                <nav>
                    <input type="radio" id="sign-up" name="nav"
                        className={this.state.selected === "signUp" ? "checked" : null}
                        value="signUp" checked={this.state.selected === "signUp"}
                        onChange={this.switch.bind(this)}/>
                    <label htmlFor="sign-up">注册</label>
                    <input type="radio" id="sign-in" name="nav"
                        className={this.state.selected === "signIn" ? "checked" : null}
                        value="signIn" checked={this.state.selected === "signIn"}
                        onChange={this.switch.bind(this)}/>
                    <label htmlFor="sign-in">登录</label>
                </nav>
                <div className="panes">
                    {this.state.selected === 'signUp' ? signUpForm : null}
                    {this.state.selected === 'signIn' ? signInForm : null}
                </div>
            </div>
        </div>
        )
    }
}