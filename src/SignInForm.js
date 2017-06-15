import React, {Component} from 'react';

export default function(props){
    return (
        <form className="signIn" onSubmit={props.onSubmit.bind(this)}>
            <div className="row">
                <input type="text" placeholder="用户名"
                    value={props.formData.username}
                    onChange={props.onChange.bind(null, 'username')}/>
            </div>
            <div className="row">
                <input type="password" placeholder="密码"
                    value={props.formData.password}
                    onChange={props.onChange.bind(null, 'password')}/>
            </div>
            <div className="row action">
                <button type="submit">登录</button>
                <a href="javascript:;" onClick={props.onForgotPassword.bind(this)}>忘记密码？</a>
            </div>
        </form>
    );
}