import React from 'react';
import './TodoItem.css';

class TodoItem extends React.Component{
    render(){
        return (
            <div className="TodoItem">
                <input type="checkbox" 
                    className={this.props.todo.status}
                    checked={this.props.todo.status === 'completed'}
                    onChange={this.toggle.bind(this)}/>
                <span className="title">{this.props.todo.title}</span>
                <button onClick={this.delete.bind(this)}>删除</button>
            </div>
        );
    }

    delete(e){
        this.props.onDelete(e, this.props.todo);
    }

    toggle(e){
        this.props.onToggle(e, this.props.todo);
    }
}

export default TodoItem;