import { Transition } from './types';
import { createStore } from 'redux';

type Level = {
    right: Array<Transition>
    left: Array<Transition>
}

type PostionValues = {
    level0: Level
    level1: Level
    level2: Level
}

const y = -46.5

const initialState = {
    rootArray: new Array<Array<number>>(),
    positionValues: {
        level0: {
            right: new Array<Transition>(),
            left: new Array<Transition>()
        },
        level1: {
            right: new Array<Transition>(),
            left: new Array<Transition>()
        },
        level2: {
            right: new Array<Transition>(),
            left: new Array<Transition>()
        }
    }
};

const sort = (rootArray: Array<number>): Array<number> => {
    // @ts-ignore
    return [].concat(rootArray).sort((a, b) => (a > b) ? 1 : -1)
}

const distance = (arr1: Array<number>, root: Array<number>, index: number): number => {
    let value = arr1[index]
    var arr2Index = 0;

    for (let i = 0; i < root.length; i++) {
        if (root[i] === value) {
            arr2Index = i
        }
    }

    return arr2Index
}

const shiftArrayLevelTwo = (array: Array<Transition>, i: number): Array<Transition> => {
    for (let j = 1; j <= i; j++) {
        let end = array!.pop()!

        if (end.x * -1 <= 0) {
            end.x = end.x * -1
        }

        end.x = end.x + (-64 * j)

        console.log(end.x)

        array.unshift(end)
    }
    return array
}

const shiftArrayLevelOne = (array: Array<Transition>, i: number): Array<Transition> => {
    console.log(array)

    for (let j = 1; j <= i; j++) {
        let end = array!.pop()!

        if (end.x * -1 <= 0) {
            end.x = end.x * -1
        }

        end.x = end.x + (-64 * j)

        console.log(end.x)

        array.unshift(end)
    }

    return array
}

const getLevelTwo = (rootArray: Array<number>, leftArray: Array<number>, rightArray: Array<number>): Level => {
    let rightVal = rightArray[0]
    let sortedRoot = sort(rootArray)
    let leftArraySorted = sort(leftArray)
    let distanceR = 0

    for (let i = 0; i < sortedRoot.length; i++) {
        if (rightVal === sortedRoot[i]) {
            distanceR = i
        }
    }

    let distanceL = []

    for (let i = 0; i < leftArraySorted.length; i++) {
        distanceL.push(distance(leftArraySorted, sortedRoot, i))
    }

    let getLeftVec = (index: number): Array<Transition> => {
        if (index === 0) {
            return [{ x: 0, y: y }, { x: 64, y: y }, { x: 128, y: y }]
        }
        else {
            return shiftArrayLevelTwo([{ x: 0, y: y }, { x: 64, y: y }, { x: 128, y: y }], index)
        }
    }

    let rightVec = [{ x: (-74 - 64), y: -46.5 }, { x: -74, y: -46.5 }, { x: -10, y: -46.5 }]

    return {
        left: distanceL.map((element: number, i: number): Transition => {
            return getLeftVec(i)[element]
        }),
        right: [rightVec[distanceR]]
    }
}

const getLevelOne = (rootArray: Array<number>, leftArray: Array<number>, rightArray: Array<number>): Level => {
    let sortedRoot = sort(rootArray)
    let leftArraySorted = sort(leftArray)
    let rightArraySorted = sort(rightArray)

    let startX = -202
    let rightVec = new Array<Transition>()
    let leftVec = [{ x: 0, y: y },{ x: 64, y: y }, { x: 128, y: y }, { x: 192, y: y }, { x: 256, y: y }]

    /*
    emptyArray.forEach((element)=> {
        console.log('element: ' + element)
    })
    */

    for (let i = 0; i < 5; i++) {
        rightVec.push({ x: (startX + (64 * i)), y: y })
    }

    let distanceR = []
    let distanceL = []

    for (let i = 0; i < rightArraySorted.length; i++) {
        distanceR.push(distance(rightArraySorted, sortedRoot, i))
    }

    for (let i = 0; i < leftArraySorted.length; i++) {
        distanceL.push(distance(leftArraySorted, sortedRoot, i))
    }

    let getVec = (index: number, vector: any, side: string): Array<Transition> => {
        if (index === 0) {
            return vector
        }
        else {
            if (side === 'right') {
                return shiftArrayLevelTwo(vector, index)
            }
            else {
                return shiftArrayLevelOne(vector, index)
            }
        }
    }

    console.log(leftVec)

    return {
        left: distanceL.map((element: number, i: number): Transition => {
            //@ts-ignore
            return getVec(i, [].concat(leftVec), 'left')[element]
        }),
        right: distanceR.map((element: number, i: number): Transition => {
            return getVec(i, rightVec, 'right')[element]
        })
    }
}

const getRoot = (rootArray: Array<number>, leftArray: Array<number>, rightArray: Array<number>): Level => {
    let sortedRoot = sort(rootArray)
    let leftArraySorted = sort(leftArray)
    let rightArraySorted = sort(rightArray)

    let startX = -325
    let rightVec = new Array<Transition>()
    let leftVec = new Array<Transition>()

    /*
    emptyArray.forEach((element)=> {
        console.log('element: ' + element)
    })
    */
    for(let i = 0; i < 10; i ++){
        leftVec.push({x: (i * 64) + 5, y: y})
    }

    for (let i = 0; i < 5; i++) {
        rightVec.push({ x: (startX + (64 * i)), y: y })
    }
    for(let i = 1; i <= 5 ; i ++){
        rightVec.push({ x: (64 * i), y: y })
    }

    let distanceR = []
    let distanceL = []

    for (let i = 0; i < rightArraySorted.length; i++) {
        distanceR.push(distance(rightArraySorted, sortedRoot, i))
    }

    for (let i = 0; i < leftArraySorted.length; i++) {
        distanceL.push(distance(leftArraySorted, sortedRoot, i))
    }

    let getVec = (index: number, vector: any, side: string): Array<Transition> => {
        if (index === 0) {
            return vector
        }
        else {
            if (side === 'right') {
                return shiftArrayLevelTwo(vector, index)
            }
            else {
                return shiftArrayLevelOne(vector, index)
            }
        }
    }

    console.log(leftVec)

    return {
        left: distanceL.map((element: number, i: number): Transition => {
            //@ts-ignore
            return getVec(i, [].concat(leftVec), 'left')[element]
        }),
        right: distanceR.map((element: number, i: number): Transition => {
            //@ts-ignore
            return getVec(i,  [].concat(rightVec), 'right')[element]
        })
    }
}


const getPositions = (root: Array<Array<number>>, arrays: Array<Array<number>>): PostionValues => {
    console.log(arrays)
    return {
        level0: getRoot(root[0], root[1], root[2]),
        level1: getLevelOne(arrays[0], arrays[1], arrays[2]),
        level2: getLevelTwo(arrays[1], arrays[3], arrays[4])
    }
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