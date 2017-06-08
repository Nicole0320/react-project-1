import React, {Component} from 'react';
import {signIn, signUp, sendPasswordResetEmail} from './leancloud';
import './UserDialog.css';
import copyByJSON from './copyByJSON';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import ForgotPasswordForm from './ForgotPasswordForm';

export default class UserDialog extends Component{
    constructor(props){
        super(props);
        this.state={
            selected: 'signUp', //signIn
            selectedTab: 'signInOrSignUp', //forgotPassword
            formData: {
                username: '',
                password: '',
                email: ''
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
        let {username, password, email} = this.state.formData;
        let success = (user)=>{
            console.log(user);
            this.props.onSignUp.call(null, user);
        }
        let error = (error)=>{
            switch(error.code){
                case 202:
                    alert('用户名已经被占用');
                    break;
                case 125:
                    alert('请填写邮箱地址');
                    break;
                default:
                    alert(error);
                    break;
            }
        }

        signUp(username, password, email, success, error)
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
                case 100:
                    alert('无法连接到服务器，请检查网络连接');
                    break;
                case 124:
                    alert('请求超时，请检查网络连接是否正常');
                    break;
                case 211:
                    alert('找不到用户');
                    break;
                case 124:
                    alert('请求超时，请检查网络连接是否正常');
                    break;
                case 201:
                    alert('密码不能为空');
                    break;
                default:
                    alert(error);
                    break;
            }
        }

        signIn(username, password, success, error);
    }

    changeFormData(key,e){
        let stateCopy = copyByJSON(this.state);
        stateCopy.formData[key] = e.target.value;
        this.setState(stateCopy);
    }
    
    showForgotPassword(){
        let stateCopy = copyByJSON(this.state);
        stateCopy.selectedTab = 'forgotPassword';
        this.setState(stateCopy);
    }

    resetPassword(e){
        e.preventDefault();
        sendPasswordResetEmail(this.state.formData.email);
    }

    cancelResetPassword(e){
        // e.preventDefault();
        let stateCopy = copyByJSON(this.state);
        stateCopy.selectedTab = 'signInOrSignUp';
        this.setState(stateCopy);
    }

    render(){

        let signInOrSignUp = (
            <div className="signInOrSignUp">
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
                    {this.state.selected === 'signUp' ? 
                        <SignUpForm formData={this.state.formData}
                          onSubmit={this.signUp.bind(this)}
                          onChange={this.changeFormData.bind(this)}/>
                        : null}
                    {this.state.selected === 'signIn' ?
                        <SignInForm formData={this.state.formData}
                          onSubmit={this.signIn.bind(this)}
                          onChange={this.changeFormData.bind(this)}
                          onForgotPassword={this.showForgotPassword.bind(this)}/>
                        : null}
                </div>
            </div>
        )

        return (
        <div className="UserDialog-Wrapper">
            <div className="UserDialog">
                {this.state.selectedTab === 'signInOrSignUp' ? signInOrSignUp : 
                    <ForgotPasswordForm formData={this.state.formData}
                     onSubmit={this.resetPassword.bind(this)}
                     onChange={this.changeFormData.bind(this)}
                     onSignIn={this.cancelResetPassword.bind(this)}/>}
            </div>
        </div>
        )
    }
}