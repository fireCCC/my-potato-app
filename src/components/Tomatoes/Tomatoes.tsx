import * as React from 'react';
import TomatoAction from './TomatoAction';
import TomatoList from './TomatoList';
import { connect } from 'react-redux';
import { addTomato, updateTomato } from '../../redux/actions/tomatoes';
import axios from 'src/config/axios';
import './Tomatoes.scss';
import _ from 'lodash';
import { format,parseISO } from 'date-fns';

interface ITomatoesProps {
    addTomato: (payload: any) => any,
    updateTomato: (payload: any) => any,
    initTomatoes: (payload: any[]) => any,
    tomatoes: any[],
}

class Tomatoes extends React.Component<ITomatoesProps, any> {
    constructor(prop: any) {
        super(prop)
    }

    get unfinishedTomato() {
        // console.log(this.props.tomatoes)
        return this.props.tomatoes.filter((t)=>{
            return (!t.description && !t.ended_at && !t.aborted)
        })[0]
    }

    get finishedTomatoes() {
        const finishedTomatoes = this.props.tomatoes.filter((t)=>{
            return (t.description && t.ended_at && !t.aborted)
        })
        console.log("finishedTomatoes", finishedTomatoes)
        const obj = _.groupBy(finishedTomatoes, (tomato: any)=>{
            return format(parseISO(tomato.started_at), 'yyyy-MM-d')
        })
        return obj
    }

    
    startTomato = async () => {
        try{
            const response = await axios.post('https://gp-server.hunger-valley.com/tomatoes', {duration: 1500000})
            this.props.addTomato(response.data.resource)
            console.log(response)
        } catch(e) {
            throw new Error(e)
        }
    }

    public render() {
        return (
            <div className="Tomatoes" id="Tomatoes">
                <TomatoAction 
                    startTomato={this.startTomato}
                    unfinishedTomato={this.unfinishedTomato}
                    updateTomato={this.props.updateTomato}
                />
                <TomatoList finishedTomatoes={this.finishedTomatoes} />

            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    tomatoes: state.tomatoes,
    ...ownProps
})

const mapDispatchToProps = {
    addTomato,
    updateTomato
}

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);