import { Button, Grid } from '@mui/material'
import React, { useEffect, useLayoutEffect, useContext, useState } from "react"
import { WalkThroughProps, WalkThroughState, Transition, TransitionComponents } from '../types';
import { useSpring, animated, useSpringRef } from 'react-spring'
import { WalkThroughProvider, WalkThroughContext } from '../components/WalkThroughProvider';
import { store } from '../Reducer';

const messages = {
    split: "The parent array is being split into two child arrays.",
    start: "The starting unsorted array is split into two children arrays, starting with the left side.",
    sortMerge: "The child arrays are sorted and merged back into the parent array. \nThe two child arrays elements are compared one by one, adding the smallest element to the parent. ",
    complete: "The array has been succesfully merged and sorted."
}

//contains a holder for the group, for styling purposes, should probably be fixed up
function ArrayHolder(props: { children: React.ReactNode }) {
    return (
        <div style={{ display: "flex", gap: "10px" }}>
            {props.children}
        </div>
    )
}

const sort = (array: any): any => {
    return [].concat(array).sort((a: any, b: any) => (a > b) ? 1 : -1)
}

const transitionValue = (props: TransitionComponents): Transition => {
    store.dispatch({
        type: 'createTransition',
        payload: {
            ...props
        }
    })

    return store.getState().transition
}


const Animation = (props: { children: React.ReactNode, play: boolean, colorOld: string, transition: Transition, colorNew: string }) => {
    //@ts-ignore
    const { setAnimating, isAnimating } = useContext(WalkThroughContext);

    console.log(props.transition)

    const [hasRun, setRun] = useState(false)

    const [animateProps, api] = useSpring(() => ({
        y: 0, x: 0,
        backgroundColor: props.colorOld,
        onRest: () => {
            setAnimating(false)
        },
    }))

    useLayoutEffect(() => {
        if (props.play && !hasRun) {
            setAnimating(true)
            setRun(true)
            api.start({
                backgroundColor: props.colorNew,
                ...props.transition,
                delay: 1000
            })
        }
    })

    return (
        <animated.div style={{ ...animateProps, flexDirection: "row" }}>
            {props.children}
        </animated.div>
    )
}

const Cell = (props: { play: boolean, color: string, numArray: any, sorted: boolean }) => {
    let numArray = props.numArray
    let unSorted = props.numArray

    return (
        <div style={{ flexDirection: "row", display: 'flex' }}>
            {(props.sorted) ? (
                [].concat(numArray[1]).sort((a, b) => (a > b) ? 1 : -1).map((element: number, i: number) => {
                    return (
                        <Animation
                            play={props.play}
                            colorOld={props.color}
                            colorNew={props.color}
                            transition={transitionValue({ array: numArray[1], correctArray: sort(unSorted[1]), index: i })}
                        >
                            <Button style={{ backgroundColor: props.color, fontWeight: 'bolder', color: 'black' }} disabled={true} variant="outlined"> {element}</Button>
                        </Animation>
                    )
                })

            ) : (
                numArray[1].map((element: number) => {
                    return <Button style={{ backgroundColor: props.color, fontWeight: 'bolder', color: 'black' }} disabled={true} variant="outlined"> {element}</Button>
                }))}
        </div >
    )
}


const ArrayComp = (props: { numArray: Array<Array<number>> }) => {

    const [click, setClick] = useState(false)

    return (
        <>
            <Button
                onClick={() => setClick(true)}
                style={{ marginBottom: '30px' }}>
                Im a button
            </Button>
            <Cell play={false} color='#ff5b5b' numArray={props.numArray} sorted={false} />
            <Cell play={click} color='#ff5b5b' numArray={props.numArray} sorted={true} />

        </>
    )
}


export default function AnimationTest() {

    return (
        <WalkThroughProvider>

            <ArrayComp
                numArray={[[0], [2, 6, 4, 3, 5]]}
            />

        </WalkThroughProvider>
    )
}
