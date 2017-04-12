import React from 'react';

class TodoInput extends React.Component{
    constructor(props){
        super(props);
        console.log('constructor:');
        console.log(props);
    }
    render(){
        console.log('render:');
        console.log(this.props.content);
        return <input type="text" value={this.props.content}/>;
    }
}

export default TodoInput;