import { Transition, Level, TransitionVectors, PositionValues } from './types';
import { createStore } from 'redux';

const y = -46.5

const initialState = {
    rootArray: new Array<Array<number>>(),
    positionValues: new Array<Level>()
};

const sort = (rootArray: Array<number>): Array<number> => {
    // @ts-ignore
    return [].concat(rootArray).sort((a, b) => (a > b) ? 1 : -1)
}

const findIndex = (arr1: Array<number>, root: Array<number>, index: number): number => {
    let value = arr1[index]
    var arr2Index = 0;

    for (let i = 0; i < root.length; i++) {
        if (root[i] === value) {
            arr2Index = i
        }
    }

    return arr2Index
}

const distance = (childArray: Array<number>, root: Array<number>) : Array<number> => {
    let distance = []

    for (let i = 0; i < childArray.length; i++) {
        distance.push(findIndex(childArray, root, i))
    }

    return distance
}

const shiftVector = (array: Array<Transition>, i: number): Array<Transition> => {
    if (i === 0) {
        return array
    }
    else {
        for (let j = 1; j <= i; j++) {
            let end = array!.pop()!

            if (end.x * -1 <= 0) {
                end.x = end.x * -1
            }

            end.x = end.x + (-64 * j)

            array.unshift(end)
        }
        return array
    }
}

const rootVector = (): TransitionVectors => {
    let rightVec = new Array<Transition>()
    let leftVec = new Array<Transition>()
    let startX = -325

    for (let i = 0; i < 10; i++) {
        leftVec.push({ x: (i * 64) + 5, y: y })
    }

    for (let i = 0; i <= 5; i++) {
        rightVec.push({ x: (startX + (64 * i)), y: y })
    }

    for (let i = 1; i < 5; i++) {
        rightVec.push({ x: (64 * i), y: y })
    }

    return {
        rightVec,
        leftVec
    }
}

const levelOneVector = (): TransitionVectors => {
    let startX = -202
    let rightVec = new Array<Transition>()
    let leftVec = [{ x: 0, y: y }, { x: 64, y: y }, { x: 128, y: y }, { x: 192, y: y }, { x: 256, y: y }]

    for (let i = 0; i < 5; i++) {
        rightVec.push({ x: (startX + (64 * i)), y: y })
    }

    return {
        rightVec,
        leftVec
    }
}

const levelTwoVector = (): TransitionVectors => {
    return {
        rightVec: [{ x: (-74 - 64), y: -46.5 }, { x: -74, y: -46.5 }, { x: -10, y: -46.5 }],
        leftVec: [{ x: 0, y: y }, { x: 64, y: y }, { x: 128, y: y }]
    }
}

const getTransition = (rootArray: Array<number>, leftArray: Array<number>, rightArray: Array<number>, vector: () => TransitionVectors): Level => {
    let { rightVec, leftVec } = vector()
    let distanceR = distance(sort(rightArray), sort(rootArray))
    let distanceL = distance(sort(leftArray), sort(rootArray))

    return {
        left: distanceL.map((element: number, i: number): Transition => {
            //@ts-ignore
            return shiftVector([].concat(leftVec), i)[element]
        }),
        right: distanceR.map((element: number, i: number): Transition => {
            //@ts-ignore
            return shiftVector([].concat(rightVec), i)[element]
        })
    }
}

const getPositions = (root: Array<Array<number>>, arrays: Array<Array<number>>): PositionValues => {
    return [
        getTransition(root[0], root[1], root[2], rootVector),
        getTransition(arrays[0], arrays[1], arrays[2], levelOneVector),
        getTransition(arrays[1], arrays[3], arrays[4], levelTwoVector)
    ]
}

const reducer = (state = initialState, action: { type: string, payload: Array<Array<number>> }) => {
    switch (action.type) {
        case 'addRoot':
            state.rootArray = action.payload
            return state

        case 'addArrays':
            state.positionValues = getPositions(state.rootArray, action.payload)
            return state

        default:
            return state
    }
}

export const store = createStore(reducer);