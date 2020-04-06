import { INIT_TOMATOES, UPDATE_TOMATO, ADD_TOMATO } from '../actionTypes';

export default (state: any[] = [], action: any) => {
    switch(action.type){
        case ADD_TOMATO: 
            return [action.payload, ...state];
        case UPDATE_TOMATO:
            return state.map(t => {
                if(t.id === action.payload.id) {
                    return action.payload
                } else {
                    return t
                }
            })
        case INIT_TOMATOES:
            return [...action.payload];
        default: 
            return state;
    }
}