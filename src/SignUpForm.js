import React from 'react';

export default function SignUpForm(props){
    return(
        <form className="signUp" onSubmit={props.onSubmit.bind(this)}>
            <div className="row">
                <label htmlFor="signup-user-name">用户名</label>
                <input type="text" id="signup-user-name"
                    value={props.formData.username}
                    onChange={props.onChange.bind(null, 'username')}/>
            </div>
            <div className="row">
                <label htmlFor="signup-password">密码</label>
                <input type="password" id="signup-password"
                    value={props.formData.password}
                    onChange={props.onChange.bind(null, 'password')}/>
            </div>
            <div className="row">
                <label htmlFor="signup-email">邮箱</label>
                <input type="text" id="signup-email"
                    value={props.formData.email}
                    onChange={props.onChange.bind(null, 'email')}/>
            </div>
            <div className="row action">
                <button type="submit">注册</button>
            </div>
        </form>
    );
}