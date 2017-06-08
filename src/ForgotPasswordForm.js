import React, {Component} from 'react';

export default class ForgotPasswordForm extends Component{
    render(){
        return (
            <div className="forgotPassword">
                <h3>重置密码</h3>
                <form className="forgotPassword" onSubmit={this.props.onSubmit.bind(this)}>
                    <div className="row">
                        <label htmlFor="email">邮箱</label>
                        <input type="text" value={this.props.formData.email}
                            onChange={this.props.onChange.bind(this, 'email')}/>
                    </div>
                    <div className="row action">
                        <button type="submit">发送重置邮件</button>
                        <button onClick={this.props.onSignIn.bind(this)}>取消</button>
                    </div>
                </form>
            </div>
        )
    }
}