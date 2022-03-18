import { Transition } from './types';
import { createStore } from 'redux';

type Level = {
    right: Array<Transition>
    left: Array<Transition>
}

type PostionValues = {
    level1: Level
    level2: Level
    level3: Level
}

const y = -1 * (36.5 + 10)

const initialState = {
    positionValues: {
        level1: {
            right: new Array<Transition>(),
            left: new Array<Transition>()
        },
        level2: {
            right: new Array<Transition>(),
            left: new Array<Transition>()
        },
        level3: {
            right: new Array<Transition>(),
            left: new Array<Transition>()
        }
    }
};

const sort = (rootArray: Array<number>) : Array<number> =>{
    // @ts-ignore
    return [].concat(rootArray).sort((a, b) => (a > b) ? 1 : -1)
}

const getLevelTwo = (rootArray: Array<number>, leftArray: Array<number>, rightArray: Array<number>): Level => {
    let rightVal = rightArray[0]
    let sortedRoot = sort(rootArray)
    let left = new Array()

    console.log(rootArray)
    
    for(let i = 0; i < sortedRoot.length; i ++){
        if(rightVal === sortedRoot[i]){
            let x = -10
            x += (i * -64)
            left.push({
                x: x,
                y: y
            })
            break;
        }
    }
    for(let i = 0; i < sortedRoot.length; i ++){
        
    }
    
    return {
        left: left,
        right: [{ x: (-74 - 64), y: -46.5 }]
    }
}

const getLevelOne = (rootArray: Array<number>, leftArray: Array<number>, rightArray: Array<number>): Level => {
    
    let sortedRoot = sort(rootArray)
    let left = new Array<Transition>()
    let right = new Array<Transition>()

    let x = -10
    for (let k = 0; k < leftArray.length; k++) {
        let rootI = 0

        for (let i = 0; i < sortedRoot.length; i++) {
            if (sortedRoot[i] === leftArray[k]) {
                rootI = i
            }
        }

        let multi = 1
        let invert = 1

        if (rootI > k) {
            multi = rootI - k
            invert = -1
        }

        if (rootI < k) {
            multi = k - rootI
        }
        if (rootI === k) {
            invert = 0
        }

        left.push({
            y: y,
            x: x * invert * multi
        })
        console.log(rootArray)
        console.log(leftArray)
        console.log(left)

    }

    for (let i = 0; i < rootArray.length; i++) {
        for (let j = 0; j < rightArray.length; j++) {
            if (sortedRoot[i] === rightArray[j]) {
                let multi = 1
                let invert = 1

                if (i > j) {
                    multi = i - j
                    invert = -1
                }

                if (i < j) {
                    multi = j - i
                }

                right.push({
                    y: y,
                    x: x * i * multi
                })
            }
        }
    }

    return {
        left: left,
        right: right
    }
}


const getPositions = (arrays: Array<Array<number>>): PostionValues => {
    return {
        level1: getLevelOne(arrays[0], arrays[1], arrays[2]),
        level2: getLevelTwo(arrays[1], arrays[3], arrays[4]),
        level3: getLevelOne(arrays[3], arrays[5], arrays[6])
    }
}
const reducer = (state = initialState, action: { type: string, payload: Array<Array<number>> }) => {
    switch (action.type) {
        case 'addArrays':
            state.positionValues = getPositions(action.payload)
            return state
        default:
            return state
    }
}

export const store = createStore(reducer);