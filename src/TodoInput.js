import React from 'react';

class TodoInput extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <input type="text" defaultValue={this.props.content}
            onKeyPress={this.submit}/>;
    }

    submit(e){
        if(e.key === 'Enter'){
            console.log('用户按回车了！');
        }
    }
}

export default TodoInput;