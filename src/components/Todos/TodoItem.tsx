import * as React from 'react';
import { Checkbox, Icon } from 'antd';
import { connect } from 'react-redux';
import axios from 'src/config/axios';
import actions from '../../redux/actions/index';
import classNames from 'classnames';

import './TodoItem.scss';

const { editTodo, updateTodo } = actions

interface ITodoItemProps {
    id: number;
    description: string;
    completed: boolean;
    editing: boolean;
    editTodo: (id: number) => any
    updateTodo: (payload: any) => any
    getTodos: any
}

interface ITodoItemState {
    editText: string;
}

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
    constructor(props: any) {
        super(props)
        this.state = {
            editText: this.props.description
        }
    }
    
    updateTodo = async (params: any) => {
        if(params.completed){
            params.completed_at = new Date()
        }
        try{
            const response = await axios.put(`https://gp-server.hunger-valley.com/todos/${this.props.id}`, params)
            this.props.updateTodo(response.data.resource)
        }catch(e){
            throw new Error(e)
        }
    }

    editTodo = () => {
        this.props.editTodo(this.props.id)
    }

    onKeyUp = (e: any) => {
        if(this.state.editText !== '' && e.keyCode === 13){
            this.updateTodo({description: this.state.editText})            
        }
    }
   
    public render() {
        const Editing = (
            <div className="editing">
                <input type="text" value={this.state.editText} 
                       onChange={e=>this.setState({editText: e.target.value})}
                       onKeyUp={this.onKeyUp}
                />
                <div className="iconWrapper">
                    <Icon type="enter" />
                    <Icon type="delete" theme="filled" 
                          onClick={e=>this.updateTodo({deleted: true})}/>
                </div>
            </div>
        )
        const Text = (
            <span className="text" onDoubleClick={this.editTodo}>
                {this.props.description}
            </span>
        )
        const todoItemClass = classNames({
            TodoItem: true,
            editing: this.props.editing,
            completed: this.props.completed
        })
        return (
            <div className={todoItemClass} id="TodoItem">
                <Checkbox checked={this.props.completed}
                          onChange={
                                e=>{
                                  this.updateTodo({completed: e.target.checked})
                                }

                            }     
                />
                {
                    this.props.editing ? Editing : Text
                }
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    ...ownProps
})

const mapDispatchToProps = {
    editTodo,
    updateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);

