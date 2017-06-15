import React, {Component} from 'react';

export default class TodoGroup extends Component{
    constructor(props){
        super(props)
    }

    render(){
        let groups = this.props.groups.map((item, index)=>{
            return(
                <li key={index} onClick={this.switchGroup.bind(this)}>
                    {item}
                </li>
            )
        })

        return(
            <ul className="Groups">
                {groups}
            </ul>
        )
    }

    switchGroup(e){
        this.props.onSwitch(e.target.innerText);
    }
}