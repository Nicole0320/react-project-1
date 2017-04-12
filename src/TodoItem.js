import React from 'react';

class TodoItem extends React.Component{
    render(){
        return (
            <div>
                <input type="checkbox" checked={this.props.todo.status === 'completed'}
                    onChange={this.toggle.bind(this)}/>
                {this.props.todo.title}
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