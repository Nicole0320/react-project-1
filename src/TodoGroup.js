import React, {Component} from 'react';
import './TodoGroup.css';
import './../public/iconfont/iconfont.css';

export default class TodoGroup extends Component{
    constructor(props){
        super(props)
        this.state = {
            desGroup: ''
        }
    }

    render(){
        let groups = this.props.groups.map((item, index)=>{
            return(
                <li key={index}>
                    <i className="iconfont icon-caidan"></i>
                        {item}
                    <div className="iconfont icon-delete delete-group"
                        onClick={this.deleteGroup.bind(this)}></div>
                </li>
            )
        })

        return(
            <ul className="TodoGroup" onClick={this.switchGroup.bind(this)}
                onChange={this.onChange.bind(this)}>
                {groups}
            </ul>
        )
    }

    onChange(e){
        console.log(e.target);
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
        this.setState({
            desGroup: e.target.innerText
        })
    }

    deleteGroup(e){
        e.stopPropagation();
        if(this.props.groups.length <= 1){
            alert('至少要存在一个分组')
            return;
        }
        let isConfirm = confirm('您的操作将删除该分组下的所有待办事项，是否继续？')
        if(isConfirm){
            this.props.onDelete.call(null, this.state.desGroup);
            let index = this.props.groups.indexOf(this.state.desGroup);
            if(index === this.props.groups.length-1){
                console.log('last')
                document.querySelector('li').setAttribute('class', 'active')
            }
        }
        else{
            return;
        }
    }
}