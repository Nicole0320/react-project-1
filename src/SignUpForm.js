import React, {Component} from 'react';

export default class SignUpForm extends Component{
    render(){
        return(
            <form className="signUp" onSubmit={this.props.onSubmit.bind(this)}>
                <div className="row">
                    <label htmlFor="signup-user-name">用户名</label>
                    <input type="text" id="signup-user-name"
                        value={this.props.formData.username}
                        onChange={this.props.onChange.bind(null, 'username')}/>
                </div>
                <div className="row">
                    <label htmlFor="signup-password">密码</label>
                    <input type="password" id="signup-password"
                        value={this.props.formData.password}
                        onChange={this.props.onChange.bind(null, 'password')}/>
                </div>
                <div className="row">
                    <label htmlFor="signup-email">邮箱</label>
                    <input type="text" id="signup-email"
                        value={this.props.formData.email}
                        onChange={this.props.onChange.bind(null, 'email')}/>
                </div>
                <div className="row action">
                    <button type="submit">注册</button>
                </div>
            </form>
        );
    }
}