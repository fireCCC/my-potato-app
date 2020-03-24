import * as React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../redux/actions';
import axios from 'src/config/axios';
import { Input, Icon } from 'antd';

interface ITodoInputProps {
    addTodo: (payload: any) => any;
    getTodos: any
}

interface ITodoInputState {
    description: string;
}

class TodoInput extends React.Component<ITodoInputProps, ITodoInputState> {
    constructor(props: any) {
        super(props);
        this.state = {
            description: ''
        }
        console.log("this.props", this.props)
    }

    onKeyUp = (e: any) => {
        if(this.state.description !== '' && e.keyCode === 13){
            console.log(e.keyCode)
            this.postTodo()
        }
    }

    postTodo = async () => {
        try {
            console.log("addtodo!")
            const response  = await axios.post('https://gp-server.hunger-valley.com/todos', 
            {description: this.state.description})
            console.log("addtodo!", response.data.resource)
            this.props.addTodo(response.data.resource)
            this.props.getTodos()
        }catch (e) {
            throw new Error(e)
        }
        this.setState({description: ''})

    }

    public render() {
        const { description } = this.state;
        const suffix = description ? <Icon type="enter" onClick={this.postTodo}/> : <span />

        return (
            <div className="TodoInput" id="TodoInput">
                <Input
                  placeholder="添加新任务"
                  suffix={suffix}
                  value={description}
                  onChange={(e) => {
                      this.setState({description: e.target.value})
                  }}
                  onKeyUp={this.onKeyUp}
                  />
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todos,
    ...ownProps
})

const mapDispatchToProps = {
    addTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);


