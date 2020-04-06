import React, { useState, FunctionComponent, useEffect } from 'react';

interface ICountDownHookProps {
    timer: number,
    onFinish: () => void
}

let timerId: NodeJS.Timeout

const CountDownHook: FunctionComponent<ICountDownHookProps> = (props) => {
    const [countDown, setCountDown] = useState(props.timer)

    const min = Math.floor(countDown/1000/60)
    const second = Math.floor(countDown/1000%60)
    const time = `${min}:${second<10?`0${second}`:second}`

    useEffect(() => {
        document.title = `${time} - my-potato-app`
        timerId = setInterval(() => {
            setCountDown(countDown - 1000)
            if(countDown < 0) {
                props.onFinish()
                document.title = `my-potato-app`
                clearInterval(timerId)
            }
        }, 1000)
        return function cleanup() {
            clearInterval(timerId)
        }
    })

    return (
        <div className="CountDown" id="CountDown">
            {time}
        </div>
    )
}

export default CountDownHook;