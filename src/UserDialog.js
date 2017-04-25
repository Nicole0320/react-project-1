import React, {Component} from 'react';
import './UserDialog.css';

export default class UserDialog extends Component{
    constructor(props){
        super(props);
        this.state={
            selected: 'signUp'
        }
    }

    switch(e){
        this.setState({
            selected: e.target.value
        })
    }

    render(){
        let signUpForm = (
            <form className="signUp">
                <div className="row">
                    <label htmlFor="signup-user-name">用户名</label>
                    <input type="text" id="signup-user-name"/>
                </div>
                <div className="row">
                    <label htmlFor="signup-password">密码</label>
                    <input type="passsword" id="signup-password"/>
                </div>
                <div className="row action">
                    <button type="submit">注册</button>
                </div>
            </form>
        );
        let signInForm = (
            <form className="signIn">
                <div className="row">
                    <label htmlFor="signin-user-name">用户名</label>
                    <input type="text" id="signin-user-name"/>
                </div>
                <div className="row">
                    <label htmlFor="signin-password">密码</label>
                    <input type="passsword" id="signin-password"/>
                </div>
                <div className="row action">
                    <button type="submit">登录</button>
                </div>
            </form>
        );

        return (
        <div className="UserDialog-Wrapper">
            <div className="UserDialog">
                <nav onChange={this.switch.bind(this)}>
                    <input type="radio" id="sign-up" name="nav"
                        value="signUp" checked={this.state.selected === "signUp"}/>
                    <label htmlFor="sign-up">注册</label>
                    <input type="radio" id="sign-in" name="nav"
                        value="signIn" checked={this.state.selected === "signIn"}/>
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