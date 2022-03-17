import { Transition, TransitionComponents } from './types';
import { createStore } from 'redux';

const y = -1 * (36.5 + 10)
const x = 64

const transition = (props: TransitionComponents & { counter: number }): Transition => {
    let array = props.array
    let correctArray = props.correctArray
    let index = props.index

    let correctIndex = 0

    for (let i = 0; i < array.length; i++) {
        if (array[index] === correctArray[i]) {
            correctIndex = i
        }
    }

    if (correctIndex === index) {
        return {
            x: 0,
            y: y
        }
    }
    if (correctIndex < index) {
        let multiplier = index - correctIndex
        console.log(multiplier)
        return {
            x: (-74) * multiplier,
            y: y
        }

    }
    if (correctIndex > index) {
        let multiplier = correctIndex - index

        return {
            x: (74) * multiplier,
            y: y
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