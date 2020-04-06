import * as React from 'react';
import TomatoAction from './TomatoAction';
import { connect } from 'react-redux';
import { addTomato, initTomatoes, updateTomato } from '../../redux/actions/tomatoes';
import axios from 'src/config/axios';
import './Tomatoes.scss';

interface ITomatoesProps {
    addTomato: (payload: any) => any,
    updateTomato: (payload: any) => any,
    initTomatoes: (payload: any[]) => any,
    tomatoes: any[],
}

class Tomatoes extends React.Component<ITomatoesProps, any> {
    constructor(prop: any) {
        super(prop)
        console.log("prop", prop)
    }

    componentDidMount() {
        this.getTomatoes()
    }

    get unfinishedTomato() {
        return this.props.tomatoes.filter((t)=>{
            return (!t.description && !t.ended_at && !t.aborted)
        })[0]
    }

    getTomatoes = async () => {
        try {
            const response = await axios.get('https://gp-server.hunger-valley.com/tomatoes')
            this.props.initTomatoes(response.data.resources)
            console.log("get!", this.props.tomatoes)
        } catch (e) {
            throw new Error(e)
        } 
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
    initTomatoes,
    updateTomato
}

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);