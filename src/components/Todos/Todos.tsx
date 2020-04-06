import * as React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/index';
import TodoInput from 'src/components/Todos/TodoInput';
import TodoItem from 'src/components/Todos/TodoItem';
import axios from 'src/config/axios';
import './Todos.scss';

const { initTodos, updateTodo } = actions

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

    getTodos = async () => {
        try{
            const response = await axios.get('https://gp-server.hunger-valley.com/todos')
            const todos = response.data.resources.map((t: any)=>Object.assign({}, t, {editing: false}))
            this.props.initTodos(todos)
        }catch (e) {
            throw new Error(e)
        }
    }

    componentWillMount() {
        this.getTodos()
    }

    public render() {
        return (
            <div className="Todos" id="Todos">
                <TodoInput getTodos={this.getTodos}/>
                <div className="todoLists">
                    {
                        this.unCompletedTodos.map((t: any)=>{
                                return (
                                    <TodoItem getTodos={this.getTodos} key={t && t.id} {...t}
                                    />
                                )
                        })
                    }
                    {
                        this.completedTodos.map((t: any)=>{
                                return (
                                    <TodoItem getTodos={this.getTodos} key={t && t.id} {...t}
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
    initTodos,
    updateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);

