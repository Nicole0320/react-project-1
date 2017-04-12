import React from 'react';

class TodoInput extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <input type="text" value={this.props.content}
            onKeyPress={this.submit.bind(this)}
            onChange={this.changeTitle.bind(this)}/>;
    }

    submit(e){
        if(e.key === 'Enter'){
            this.props.onSubmit(e);
        }
    }

    changeTitle(e){
        this.props.onChange(e);
    }
}

export default TodoInput;