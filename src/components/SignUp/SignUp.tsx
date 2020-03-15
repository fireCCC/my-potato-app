import * as React from 'react';
import { Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'src/config/axios';
import './SignUp.scss'

interface ISignUpState {
    account: string,
    password: string,
    passwordConformation: string
}

class SignUp extends React.Component<any, ISignUpState> {
    constructor(props: any) {
        super(props);
        this.state = {
            account: '',
            password: '',
            passwordConformation: ''
        }
    }

    onChange = (key:  string, value: string) => {
        const newState = {}
        newState[key] = value
        this.setState(newState)
    }

    submit = async () => {
        const { account, password, passwordConformation } = this.state;
        try{
            await axios.post('https://gp-server.hunger-valley.com/sign_up/user', {
                account,
                password,
                password_confirmation: passwordConformation
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
        const { account, password, passwordConformation } = this.state;
        return (
            <div className="SignUp" id="SignUp">
                <h1>番茄闹钟注册</h1>
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
                <Input.Password 
                    placeholder="请确认密码"
                    value={passwordConformation}
                    onChange={(e) => {this.onChange('passwordConformation', e.target.value)}}
                />
                <Button type="primary" className="signUpButton" onClick={this.submit}>注册</Button>
                <p>或者立即<Link to="/login">登录</Link></p>
            </div>
        )
    }
}

export default SignUp;

