import * as React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/todos';
import TodoInput from 'src/components/Todos/TodoInput';
import TodoItem from 'src/components/Todos/TodoItem';
import './Todos.scss';

const { updateTodo } = actions

class Todos extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    get unDeletedTodos() {
        return this.props.todos.filter((t: any) => !t.deleted)
    }

    get unCompletedTodos() {
        return this.unDeletedTodos.filter((t: any) => !t.completed)
    }

    get completedTodos() {
        return this.unDeletedTodos.filter((t: any) => t.completed)
    }

    public render() {
        return (
            <div className="Todos" id="Todos">
                <TodoInput getTodos={this.props.getTodos}/>
                <div className="todoLists">
                    {
                        this.unCompletedTodos.map((t: any)=>{
                                return (
                                    <TodoItem getTodos={this.props.getTodos} key={t && t.id} {...t}
                                    />
                                )
                        })
                    }
                    {
                        this.completedTodos.map((t: any)=>{
                                return (
                                    <TodoItem getTodos={this.props.getTodos} key={t && t.id} {...t}
                                    />
                                )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todos,
    ...ownProps
})

const mapDispatchToProps = {
    updateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);

