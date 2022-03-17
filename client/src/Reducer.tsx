import { Transition, TransitionComponents } from './types';
import { createStore } from 'redux';

const y = -1 * (36.5 + 10)

const getX = (flip: boolean): number => {
    return (flip) ? (64 - 10) : (64 + 10)
}

const transition = (props: TransitionComponents & { counter: number }): Transition => {
    let array = props.array
    let value = array[props.index]

    for(let i = 0; i < array.length; i++ ){
        let curr = array[i]
        if(curr > value){
            

        }
    }
    
    return {
        x: 0,
        y: y
    }
}

const initialState = {
    counter: 0,
    transition: {
        x: 0,
        y: 0
    }
};

const reducer = (state = initialState, action: { type: string, payload: number | TransitionComponents }) => {
    switch (action.type) {
        case 'addCounter':
            state.counter = action.payload as number
            return state
        case 'createTransition':
            state.transition = transition({
                ...action.payload as TransitionComponents,
                counter: state.counter
            })
            return state
        default:
            return state
    }
}

export const store = createStore(reducer);