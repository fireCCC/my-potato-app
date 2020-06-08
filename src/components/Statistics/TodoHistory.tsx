import * as React from 'react';
import { connect } from 'react-redux';
import { format, parseISO } from 'date-fns';
import _ from 'lodash';

interface ITodoHistoryProps {
    todos: any[],
}

const TodoItem = (props: any) => {
    return (<div>
        <span>{props.updated_at}</span>
        <span>{props.description}</span>
    </div>)
}

class TodoHistory extends React.Component<ITodoHistoryProps> {
    constructor(props: any) {
        super(props)
    }

    get finishedTodos() {
        return this.props.todos.filter(t => {
            return t.completed && !t.deleted
        })
    }

    get deletedTodos() {
        return this.props.todos.filter(t => {
            return t.deleted
        })
    }

    get dailyFinishedTodos() {
        const obj = _.groupBy(this.finishedTodos, (todo)=>{
            return format(parseISO(todo.updated_at), 'yyyy-MM-d')
        })
        return obj
    }

    get dates() {
        return Object.keys(this.dailyFinishedTodos).sort((a, b) => {
            return Date.parse(b) - Date.parse(a)
        })
    }

    public render() {
        const todoList = this.dates.map(date => {
            return (
                <div key={date}>
                    <div>
                        {date}
                        完成了{this.dailyFinishedTodos[date].length}个任务
                    </div>
                    <div>
                    {
                        this.dailyFinishedTodos[date].map(todo => {
                            return (
                                <TodoItem key={todo.id} {...todo} />
                            )
                        })
                    }
                    </div>
                
                </div>
            )
        })
        return (
            <div className="TodoHistory" id="TodoHistory">
                {todoList}
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todos,
    ...ownProps
})

export default connect(mapStateToProps)(TodoHistory);
