import { store } from "../../Reducer"
import { Transition } from "../../types"
import { AnimationElement } from "./Animation"
import { Button } from '@mui/material'

const transitionValue = (counter: number, index: number, side: string): Transition => {
    let state = store.getState()
    try {
        return state.positionValues[counter - 1][side][index]
    }
    catch (e) {
        console.log(e)
    }
    return {
        x: 1,
        y: 1
    }
}

export const Cell = (props: { play: boolean, color: string, numArray: any, sorted: boolean, counter: number, side: string }) => {
    let numArray = props.numArray

    return (
        <div style={{ flexDirection: "row", display: 'flex' }}>
            {(props.sorted) ? (
                [].concat(numArray[1]).sort((a, b) => (a > b) ? 1 : -1).map((element: number, i: number) => {
                    return (
                        <AnimationElement
                            play={props.play}
                            colorOld={props.color}
                            colorNew='#ff5b5b'
                            transition={transitionValue(props.counter, i, props.side)}
                        >
                            <Button style={{ fontWeight: 'bolder', color: 'black' }} disabled={true} variant="outlined"> {element}</Button>
                        </AnimationElement>
                    )
                })

            ) : (
                numArray[1].map((element: number) => {
                    return <Button style={{ backgroundColor: props.color, fontWeight: 'bolder', color: 'black' }} disabled={true} variant="outlined"> {element}</Button>
                }))}
        </div >
    )
}