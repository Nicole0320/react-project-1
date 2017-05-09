import React from 'react';
import './TodoInput.css';
import './iconfont/iconfont.css'

class TodoInput extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
        <form className="TodoInput" onSubmit={this.addItem.bind(this)}>
            <input type="text" className="InputBar"
                placeholder="添加待办事项..."
                value={this.props.content}
                onKeyPress={this.submit.bind(this)}
            onChange={this.changeTitle.bind(this)}/>
            <button type="submit"><i className="iconfont icon-tianjia"></i></button>
        </form>
        );
    }

    addItem(e){
        e.preventDefault();
        if(this.props.content !== ''){
            this.props.onSubmit(this.props.content);
        }
    }

    submit(e){
        if(e.key === 'Enter' && e.target.value !== ''){
        e.preventDefault();
            this.props.onSubmit(e.target.value);
        }
    }

    changeTitle(e){
        this.props.onChange(e);
    }
}

export default TodoInput;