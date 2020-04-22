import * as React from 'react';
import { connect } from 'react-redux';
import './Statistics.scss';

interface IStatisticsProps {
    todos: any[];
}

class Statistics extends React.Component<IStatisticsProps, any> {
    constructor(props: any) {
        super(props);
    }

    get finishedTodos() {
        return this.props.todos.filter((t: any) => {
            return t.completed && !t.deleted
        })
    }

    public render() {
        return (
            <div className="Statistics" id="Statistics">
                <ul>
                    
                    <li>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icontongji" />
                    </svg>
                        统计
                    </li>
                    <li>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#iconbingo" />
                    </svg>
                        目标
                    </li>
                    <li>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#iconhistory" />
                    </svg>
                        番茄历史
                    </li>
                    <li>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#iconrenwu" />
                    </svg>
                        任务历史
                        累计完成{this.finishedTodos.length}个任务
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todos,
    ...ownProps
})

export default connect(mapStateToProps)(Statistics);

