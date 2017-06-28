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
                <li key={index} onClick={this.deleteGroup.bind(this)}>
                    <i className="iconfont icon-caidan"></i>
                        {item}
                    <div className="iconfont icon-delete delete-group"></div>
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
        let classes = e.target.getAttribute('class');
        if(classes === null){
            return;
        }
        if(classes.match(/delete-group/g) !== null){
            e.stopPropagation();
            if(this.props.groups.length <= 1){
                alert('至少要保留一个分组')
                return;
            }
            let isConfirm = confirm('您的操作将删除该分组下的所有待办事项，是否继续？')
            if(isConfirm){
                this.setState({
                    desGroup: e.currentTarget.innerText
                })
                this.props.onDelete.call(null, e.currentTarget.innerText)
                let index = this.props.groups.indexOf(e.currentTarget.innerText);
                if(index === this.props.groups.length-1){
                    document.querySelector('li').setAttribute('class', 'active')
                }
            }
            else{
                return;
            }
        }
    }
}