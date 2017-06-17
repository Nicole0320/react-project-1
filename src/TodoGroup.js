import React, {Component} from 'react';
import './TodoGroup.css';
import './../public/iconfont/iconfont.css';

export default class TodoGroup extends Component{
    constructor(props){
        super(props)
    }

    render(){
        let groups = this.props.groups.map((item, index)=>{
            return(
                <li key={index}>
                    <i className="iconfont icon-caidan"></i>{item}
                </li>
            )
        })

        return(
            <ul className="TodoGroup" onClick={this.switchGroup.bind(this)}>
                {groups}
            </ul>
        )
    }

    switchGroup(e){
        if(e.target === e.currentTarget){
            return;
        }
        this.props.onSwitch(e.target.innerText);
        let node = e.currentTarget.querySelector('.active')
        if(node!==null){
            node.removeAttribute('class');
        }
        e.target.setAttribute('class', 'active');
    }
}