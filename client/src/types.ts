type WalkThroughProps = {
    numArray: Array<Array<Array<number>>>
    changeLevel: (name: string) => void
}

type CounterADT = {
    left: number
    right: number
}

interface Counter extends CounterADT {
    [key: string]: number
}

type WalkThroughState = {
    numArray: Array<Array<Array<number>>>
    counter: Counter
    side: string
    sorted: boolean
    leftSideSorted: boolean
    doneSorting: boolean
    infoMsg: string
    changeLevel: (name: string) => void
    barIsAnimating: boolean
}

type LevelADT = {
    left: Array<Transition>
    right: Array<Transition>
}

interface Level extends LevelADT {
    [key: string]: Array<Transition>
}

type PositionValues = Array<Level>

type TransitionVectors = {
    leftVec: Array<Transition>
    rightVec: Array<Transition>
}

type Transition = {
    x: number
    y: number
}

export type {
    WalkThroughProps,
    WalkThroughState,
    Transition,
    Level,
    PositionValues,
    TransitionVectors
}
