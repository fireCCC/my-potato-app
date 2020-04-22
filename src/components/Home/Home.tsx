import * as React from 'react';
import { Dropdown, Icon, Menu } from "antd";
import axios from 'src/config/axios';
import history from 'src/config/history'
import Todos from 'src/components/Todos/Todos'
import Tomatoes from 'src/components/Tomatoes/Tomatoes'
import { connect } from 'react-redux';
import actions from '../../redux/actions/todos';
import { initTomatoes } from '../../redux/actions/tomatoes';
import Statistics from 'src/components/Statistics/Statistics'
import './Home.scss'

const { initTodos } = actions

interface IIndexState {
    user: any
}

const logout = () => {
    localStorage.setItem('x-token', '')
    history.push('/login')
}

const menu = (
    <Menu>
        <Menu.Item key="1"><Icon type="user" />个人设置</Menu.Item>
        <Menu.Item key="2" onClick={logout}><Icon type="logout" />注销</Menu.Item>
    </Menu>
)


class Home extends React.Component<any, IIndexState> {
    constructor(prop: any) {
        super(prop)
        this.state = {
            user: {}
        }
    }

    async componentWillMount() {
        await this.getMe()
        await this.getTodos()
        await this.getTomatoes()
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

    
    getTomatoes = async () => {
        try {
            const response = await axios.get('https://gp-server.hunger-valley.com/tomatoes')
            this.props.initTomatoes(response.data.resources)
        } catch (e) {
            throw new Error(e)
        } 
    }

    getMe = async () => {
        const response = await axios.get('https://gp-server.hunger-valley.com/me')
        this.setState({user: response.data})
    }

    public render() {
        return (
            <div className="Home" id="Home">
                <header>
                    <span className="logo">
                    个人计划
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icontodo_list" />
                    </svg>
                    </span>
                    <Dropdown overlay={menu}>
                        <span>
                            欢迎！
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#iconyonghutouxiang" />
                            </svg>
                            {this.state && this.state.user && this.state.user.account}
                            <Icon type="down" style={{marginLeft: 6}}/>
                            </span>
                    </Dropdown>
                </header>
                <main>
                    <Tomatoes />
                    <Todos />
                </main>
                <Statistics />
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    ...ownProps
})


const mapDispatchToProps = {
    initTodos,
    initTomatoes
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);