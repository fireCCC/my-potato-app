import * as React from 'react';
import { connect } from 'react-redux';
import { format, parseISO } from 'date-fns';
import actions from '../../../redux/actions/todos';
import axios from 'src/config/axios';
import './TodoHistoryTodoItem.scss';

const { updateTodo } = actions

interface ITodoHistoryTodoItemProps {
    todo: any,
    itemType: string,
    updateTodo: (payload: any)=>void,
}

class TodoHistoryTodoItem extends React.Component<ITodoHistoryTodoItemProps> {
    constructor(props: any) {
        super(props)
    }

    updateTodo = async (params: any) => {
        try {
            const response = await axios.put(`https://gp-server.hunger-valley.com/todos/${this.props.todo.id}` ,params)
            this.props.updateTodo(response.data.resourse)
        } catch (e) {
            throw new Error(e)
        }
    }

    public render() {
        let action
        let formatText = ''
        let time = ''
        if(this.props.itemType === 'finished') {
            formatText = 'HH:mm'
            time = this.props.todo.updated_at
            action = (
                <div className="action">
                    <span onClick={()=>{
                        return this.updateTodo({finished: false})
                    }}>恢复</span>
                    <span onClick={()=>{
                        return this.updateTodo({deleted: true})
                    }}>删除</span>
                </div>
            )
        }else if(this.props.itemType === 'deleted'){
            formatText = 'yyyy-MM-dd'
            time = this.props.todo.created_at
            action = (
                <div className="action">
                    <span onClick={()=>{
                        return this.updateTodo({deleted: false})
                    }}>恢复</span>
                </div>
            )
        }
        return (
            <div className="TodoHistoryTodoItem" id="TodoHistoryTodoItem">
                <div className="text">
                    <span className="time">{format(parseISO(time), formatText)} </span>
                    任务：<span className="description">{this.props.todo.description}</span>
                </div>
                {action}
            </div>
            
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    ...ownProps
})

const mapDispatchToProps = {
    updateTodo,
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoHistoryTodoItem);
