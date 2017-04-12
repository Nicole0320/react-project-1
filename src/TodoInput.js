import React from 'react';

class TodoInput extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return <input type="text" defaultValue={this.props.content}/>;
    }
}

export default TodoInput;