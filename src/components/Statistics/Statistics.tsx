import * as React from 'react';
import { connect } from 'react-redux';
import './Statistics.scss';
import Polygon from './Polygon';
import TodoHistory from './TodoHistory';
import { format, parseISO } from 'date-fns';
import _ from 'lodash';

interface IStatisticsProps {
    todos: any[];
}

class Statistics extends React.Component<IStatisticsProps, any> {
    constructor(props: any) {
        super(props);
    }

    get finishedTodos() {
        console.log('this.props.todos', this.props.todos)
        return this.props.todos.filter((t: any) => {
            return t.completed && !t.deleted
        })
    }

    get dailyTodos() {
        const obj = _.groupBy(this.finishedTodos, (todo)=>{
            return format(parseISO(todo.updated_at), 'yyyy-MM-d')
        })
        return obj
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
                        <Polygon 
                            data={this.dailyTodos}
                            totalFinishedCount={this.finishedTodos.length} />
                    </li>
                </ul>
                <TodoHistory />
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todos,
    ...ownProps
})

export default connect(mapStateToProps)(Statistics);

