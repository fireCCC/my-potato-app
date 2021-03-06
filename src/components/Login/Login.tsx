import * as React from 'react';
import { Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'src/config/axios';
import './Login.scss'

interface ILoginState {
    account: string,
    password: string,
}

class Login extends React.Component<any, ILoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            account: 'zwx',
            password: 'zwx'
        }
    }

    onChange = (key:  string, value: string) => {
        const newState = {}
        newState[key] = value
        this.setState(newState)
    }

    onChangeAccount = (e: any) => {
        this.setState({ account: e.target.value})
    }

    onChangePassword = (e: any) => {
        this.setState({ password: e.target.value})
    }

    submit = async () => {
        const { account, password } = this.state;
        try{
            await axios.post('https://gp-server.hunger-valley.com/sign_in/user', {
                account,
                password,
            })
            console.log('success')
            this.props.history.push('/')
        }catch(e){
            throw new Error(e)
        }finally{
            console.log('finally')
        }
    }

    public render() {
        const { account, password } = this.state;
        return (
            <div className="Login" id="Login">
                <h1>番茄闹钟登录</h1>
                <Input
                    placeholder="请输入用户名"
                    size="large" 
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)'}} />} 
                    value={account}
                    onChange={(e) => {this.onChange('account', e.target.value)}}
                />
                <Input.Password 
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => {this.onChange('password', e.target.value)}}
                />
                <Button type="primary" className="loginButton" onClick={this.submit}>登录</Button>
                <p>可直接登陆哟~或者<Link to="/signUp">立即注册</Link></p>
            </div>
        )
    }
}

export default Login;

