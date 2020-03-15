import * as React from 'react';
import TodoInput from 'src/components/Todos/TodoInput';
import TodoItem from 'src/components/Todos/TodoItem';
import axios from 'src/config/axios';
import './Todos.scss';

interface ITodosState {
    todos: any[];
}

class Todos extends React.Component<any, ITodosState> {
    constructor(props: any) {
        super(props)
        this.state = {
            todos: []
        }
    }

    addTodo = async (params: any) => {
        const { todos } = this.state
        try{
            const response = await axios.post('https://gp-server.hunger-valley.com/todos', params)
            this.setState({todos: [response.data.resources, ...todos]})
            console.log("state", this.state)
        }catch (e) {
            throw new Error(e)
        }
    }

    getTodos = async () => {
        try{
            const response = await axios.get('https://gp-server.hunger-valley.com/todos')
            console.log("response.data", response.data)
            this.setState({todos: response.data.resources})
        }catch (e) {
            throw new Error(e)
        }
    }

    updateTodo = async (id: number, params: any) => {
        const {todos} = this.state
        try{
            const response = await axios.put(`https://gp-server.hunger-valley.com/todos/${id}`, params)
            console.log(response)
            const newTodos = todos.map(t=>{
                if(id === t.id){
                    return response.data.resource
                } else {
                    return t
                }
            })
            this.setState({todos: newTodos})

        }catch(e){
            throw new Error(e)
        }
    }

    componentWillMount() {
        this.getTodos()
    }

    public render() {
        return (
            <div className="Todos" id="Todos">
                <TodoInput addTodo={(params: any)=>{this.addTodo(params)}}/>
                <main>
                    {
                        this.state.todos.map(t=>{
                                return (<TodoItem key={t && t.id} {...t}
                                    update={this.updateTodo}
                                />)
                        })
                    }
                </main>
            </div>
        )
    }
}

export default Todos;
