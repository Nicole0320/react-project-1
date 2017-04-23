import React, {Component} from 'react';
import './UserDialog.css';

export default class UserDialog extends Component{
    render(){
        return (
        <div className="UserDialog-Wrapper">
            <div className="UserDialog">
                <nav>
                    <input type="radio" id="sign-up"/>
                    <label htmlFor="sign-up">注册</label>
                    <input type="radio" id="sign-in"/>
                    <label htmlFor="sign-in">登录</label>
                </nav>
                <div className="panes">
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
                </div>
            </div>
        </div>
        )
    }
}