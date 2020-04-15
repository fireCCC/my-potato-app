import * as React from 'react';
import { Progress } from 'antd';
import './CountDown.scss';

interface ICountDownProps {
    timer: number,
    duration: number,
    onFinish: () => void
}

interface ICountDownState {
    countDown: number;
}

let timerId: NodeJS.Timeout

class CountDown extends React.Component<ICountDownProps, ICountDownState> {
    constructor(prop: any) {
        super(prop)
        this.state = {
            countDown: this.props.timer
        }
    }

    get countDown() {
        const min = Math.floor(this.state.countDown/1000/60)
        const second = Math.floor(this.state.countDown/1000%60)
        const time = `${ min < 10 ? `0${min}` : min } 
                    : ${ second < 10 ? `0${second}` : second }
        `
        return time
    }

    componentDidMount() {
        timerId = setInterval(() => {
            const time = this.state.countDown
            this.setState({countDown: time - 1000})
            document.title = `${this.countDown} - my-potato-app`
            if(time < 1000) {
                document.title = 'my-potato-app'
                this.props.onFinish()
                clearInterval(timerId)
            }
        }, 1000)
    }
    
    componentWillUnmount() {
        clearInterval(timerId)
    }

    public render() {
        const percent = 1 - this.state.countDown / this.props.duration
        return (
            <div className="CountDown" id="CountDown">
                <span className="restTime">{this.countDown}</span>
                {/* <div 
                    className="progress"
                    style={{width: `${percent * 100}%`}} 
                />  */}
                <Progress
                    className="progress"
                    strokeColor={{
                        '0%': '#e9e9e9',
                        '100%': '#c9c9c9',
                    }}
                    showInfo={false}
                    strokeWidth={30}
                    percent={percent * 100}
                />
            </div>
        )
    }
}

export default CountDown;