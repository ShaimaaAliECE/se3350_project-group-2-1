import { NumberLiteralType } from "typescript"

type TransitionComponents = {
    correctArray: Array<number>
    array: Array<number>
    index: number
}

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
}

type Transition = {
    x: number
    y: number
}

export type {
    WalkThroughProps,
    WalkThroughState,
    Transition,
    TransitionComponents
}