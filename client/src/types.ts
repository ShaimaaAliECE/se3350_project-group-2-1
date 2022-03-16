import { NumberLiteralType } from "typescript"

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

export type {
    WalkThroughProps,
    WalkThroughState
}