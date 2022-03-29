import { Button, Grid } from '@mui/material'
import React, { useEffect, useLayoutEffect, useContext, useState } from "react"
import { WalkThroughProps, WalkThroughState, Transition } from '../types';
import { useSpring, animated, useSpringRef } from 'react-spring'
import { WalkThroughProvider, WalkThroughContext } from './WalkThroughProvider';
import { store } from '../Reducer';

const messages = {
    split: "The parent array is split into two child arrays",
    start: "The starting unsorted array is split into two child arrays, starting with the Leftmost array",
    sortMerge:  "The two child arrays are individually compared, with the smallest added back to the leftmost side of the parent",
    complete: "The array is now successfully merged and sorted"
}

//contains a holder for the group, for styling purposes, should probably be fixed up
function ArrayHolder(props: { children: React.ReactNode }) {
    return (
        <div style={{ display: "flex", gap: "10px" }}>
            {props.children}
        </div>
    )
}


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

const AnimationElement = (props: { children: React.ReactNode, play: boolean, colorOld: string, transition: Transition, colorNew: string }) => {
    //@ts-ignore
    const { setAnimating } = useContext(WalkThroughContext);

    const [hasRun, setRun] = useState(false)

    const [animateProps, api] = useSpring(() => ({
        y: 0, x: 0,
        backgroundColor: props.colorOld,
        onRest: () => {
            setAnimating(false)
        },
    }))

    /*
    useLayoutEffect(() => {
        if (props.play && !hasRun) {
            setAnimating(true)
            setRun(true)
            api.start({
                backgroundColor: props.colorNew,
                ...props.transition,
                delay: 500,
            })
        }
    })
*/
    return (
        <animated.div style={{ ...animateProps, flexDirection: "row" }}>
            {props.children}
        </animated.div>
    )
}

const Cell = (props: { play: boolean, color: string, numArray: any, sorted: boolean, counter: number, side: string }) => {
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


const ArrayComp = (props: { playRoot: boolean, side: string, numArray: Array<Array<Array<number>>>, counter: number, runCalc: boolean, values: Array<number>, sorted: boolean }) => {
    //not actually a react component it just returns an array
    let numArray = props.numArray
    let counter = props.counter
    let values = props.values

    const [hasCalc, setCalc] = useState(false)

    if (!hasCalc && props.runCalc) {
        let organized = values.map((element: any) => {
            return numArray[element][1]
        })

        store.dispatch({
            type: 'addArrays',
            payload: organized
        })
        setCalc(true)
    }

    //for determining if it should be sorted or not based on the level its at vs the counter position
    const flipSorted = (level: any) => {
        if (props.sorted) {
            if (level >= counter) {
                return true
            }
            else {
                return false
            }
        }
        else {
            return false
        }
    }

    let arrComp = [
        <AnimationBar
            play={!flipSorted(1) && counter === 1}
        >
            <Cell key={0} side={props.side} counter={counter} play={props.playRoot} color='#ff5b5b' numArray={numArray[values[0]]} sorted={flipSorted(1)} />
        </AnimationBar>,

        <AnimationBar
            play={!flipSorted(2) && counter === 2}
        >
            <ArrayHolder key={1}>
                <Cell key={2} side='left' counter={counter} play={flipSorted(2) && counter === 2} color='#ff5b5b' numArray={numArray[values[1]]} sorted={flipSorted(2)} />
                <Cell key={3} side='right' counter={counter} play={flipSorted(2) && counter === 2} color='#ff5b5b' numArray={numArray[values[2]]} sorted={flipSorted(2)} />
            </ArrayHolder >
        </AnimationBar>,

        <AnimationBar
            play={!flipSorted(3) && counter === 3}
        >
            <ArrayHolder key={4}>
                <ArrayHolder key={5}>
                    <Cell key={6} side='left' counter={counter} play={flipSorted(3) && (counter === 3)} color='#ff5b5b' numArray={numArray[values[3]]} sorted={flipSorted(3)} />
                    <Cell key={7} side='right' counter={counter} play={flipSorted(3) && (counter === 3)} color='lightblue' numArray={numArray[values[4]]} sorted={flipSorted(3)} />
                </ArrayHolder>
                <AnimationElement
                    key={8}
                    play={flipSorted(3) && counter === 3}
                    colorOld='#ff5b5b'
                    colorNew='#ff5b5b'
                    transition={(numArray[values[2]][1][0] <= numArray[values[2]][1][1]) ? ({ x: -10, y: -46.5 }) : ({ x: 54, y: -46.5 })}
                >
                    <Button key={9} style={{ backgroundColor: '#ff5b5b', fontWeight: 'bolder', color: 'black' }} disabled={true} variant="outlined"> {numArray[values[2]][1][0]}</Button>
                </AnimationElement>
                <AnimationElement
                    key={10}
                    play={flipSorted(3) && counter === 3}
                    colorOld='lightblue'
                    colorNew='#ff5b5b'
                    transition={(numArray[values[2]][1][0] <= numArray[values[2]][1][1]) ? ({ x: -20, y: -46.5 }) : ({ x: -84, y: -46.5 })}
                >
                    <Button key={11} style={{ fontWeight: 'bolder', color: 'black' }} disabled={true} variant="outlined"> {numArray[values[2]][1][1]}</Button>
                </AnimationElement>
            </ArrayHolder>
        </AnimationBar>,
        <AnimationBar
            play={!flipSorted(4) && counter === 4}
        >
            <ArrayHolder key={12} >
                <AnimationElement
                    key={13}
                    play={counter === 4}
                    colorOld='#ff5b5b'
                    colorNew='#ff5b5b'
                    transition={(numArray[values[5]][1][0] <= numArray[values[6]][1][0]) ? ({ x: 0, y: -46 }) : ({ x: 64, y: -46 })}
                >
                    <Button key={16} style={{ fontWeight: 'bolder', color: 'black', backgroundColor: "#ff5b5b" }} disabled={true} variant="outlined"> {numArray[values[5]][1][0]}</Button>
                </AnimationElement>
                <AnimationElement
                    key={14}
                    play={counter === 4}
                    colorOld="lightblue"
                    colorNew='#ff5b5b'
                    transition={(numArray[values[5]][1][0] <= numArray[values[6]][1][0]) ? ({ x: -10, y: -46 }) : ({ x: -74, y: -46 })}
                >
                    <Button key={15} style={{ fontWeight: 'bolder', color: 'black' }} disabled={true} variant="outlined"> {numArray[values[6]][1][0]}</Button>
                </AnimationElement>
            </ArrayHolder>
        </AnimationBar>
    ]

    return (
        <>
            {arrComp.map((element: React.ReactNode, i: number) => {
                return (i < counter) ? (element) : (<a style={{ width: 64, height: 36.5 }}></a>)
            })}
        </>
    )
}

const IncrementButton = (props: { increaseCounter: () => void }) => {
    //@ts-ignore
    const { isAnimating } = useContext(WalkThroughContext);

    return (
        <Button
            onClick={() => { if (!isAnimating) props.increaseCounter() }}
            variant="contained"
            style={{ width: 140, height: 50, marginTop: 15, position: 'absolute', left: '46%' }}
        >Next!</Button>
    )
}

export default class WalkThrough extends React.Component<WalkThroughProps, WalkThroughState> {
    constructor(props: WalkThroughProps) {
        super(props)

        store.dispatch({
            type: 'addRoot',
            payload: [props.numArray[0][1], props.numArray[2][1], props.numArray[15][1]]
        })

        this.state = {
            numArray: props.numArray,
            counter: { 'left': 0, 'right': 0 },
            side: 'left',
            sorted: false,
            leftSideSorted: false,
            doneSorting: false,
            infoMsg: messages.start,
            changeLevel: props.changeLevel,
            barIsAnimating: false
        }
    }

    //if statements for handling the counter, flipping sides to display, and flipping if the counter should be increased/decreseased and controlling if we want the displayed to be sorted or not
    increaseCounter = () => {
        if (this.state.counter['left'] === 0 && !this.state.leftSideSorted) {
            this.setState(prevState => {
                return {
                    counter: {
                        ...prevState.counter,
                        ['right']: prevState.counter['right'] + 1
                    }
                }
            })
        }

        if (this.state.leftSideSorted && this.state.counter['right'] === 1 && this.state.sorted === true) {
            this.setState({
                doneSorting: true,
                infoMsg: messages.complete
            })
        }
        else {
            if (this.state.counter[this.state.side] === 1 && this.state.sorted === true) {
                this.setState(prevState => {
                    return {
                        side: 'right',
                        sorted: false,
                        infoMsg: messages.split,
                        leftSideSorted: true,
                        counter: {
                            ...prevState.counter,
                            ['right']: prevState.counter['right'] + 1
                        }
                    }
                })
            }
            else {
                if (this.state.counter[this.state.side] === 4 && !this.state.sorted) {
                    this.setState(prevState => {
                        return {
                            infoMsg: messages.sortMerge,
                            sorted: true,
                            counter: {
                                ...prevState.counter,
                                [this.state.side]: prevState.counter[this.state.side] - 1,
                            }
                        }
                    })
                }
                else {
                    if (this.state.sorted) {
                        this.setState(prevState => {
                            return {
                                infoMsg: messages.sortMerge,
                                barIsAnimating: true,
                                counter: {
                                    ...prevState.counter,
                                    [this.state.side]: prevState.counter[this.state.side] - 1
                                }
                            }
                        })
                    }
                    if (!this.state.sorted) {
                        this.setState(prevState => {
                            return {
                                infoMsg: messages.split,
                                barIsAnimating: true,
                                counter: {
                                    ...prevState.counter,
                                    [this.state.side]: prevState.counter[this.state.side] + 1
                                }
                            }
                        })
                    }
                }
            }
        }
    }


    render() {
        return (
            <WalkThroughProvider>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <strong style={{
                        textAlign: 'center'
                    }}>Merge Sort Walkthrough</strong>
                    <div style={{
                        display: "flex",
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Cell side='right' counter={0} play={true} numArray={this.state.numArray[0]} color='' sorted={this.state.doneSorting} />
                    </div>

                    {(this.state.doneSorting) ? (
                        <>
                            <div 
                                className="infoText" 
                                style={{
                                    display: "flex",
                                    flexDirection: 'column',
                                    gap: 6,
                                    outline: "solid",
                                    padding: 10,
                                    textAlign: 'center',
                                    marginLeft: '32%',
                                    marginRight: '32%',
                                    marginTop: 10,
                                }}
                            >
                                <div><strong>Current Action: </strong>{messages.complete}</div>
                                <div><strong>Status: </strong> Complete</div>
                            </div>
                            <Button variant='contained' style={{ width: 140, height: 50, marginTop: 15, position: 'absolute', left: '46%', top: '39%' }} onClick={() => { this.state.changeLevel("WalkThrough") }}>Next Level</Button>
                        </>
                    ) : (
                        <div>
                            <div style={{
                                display: "flex",
                                justifyContent: 'center',
                                flexDirection: 'row',
                                gap: '10px',
                                marginBottom: '10px'
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <ArrayComp
                                        numArray={this.state.numArray}
                                        sorted={(this.state.sorted || this.state.side === 'right')}
                                        counter={this.state.counter['left']}
                                        values={[2, 3, 10, 4, 8, 5, 6]}
                                        runCalc={('left' === this.state.side)}
                                        side='left'
                                        playRoot={this.state.leftSideSorted && this.state.counter['right'] === 1 && this.state.sorted === true}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <ArrayComp
                                        side='right'
                                        numArray={this.state.numArray}
                                        sorted={this.state.sorted && this.state.side !== 'left'}
                                        counter={this.state.counter['right']}
                                        values={[15, 16, 23, 17, 21, 18, 19]}
                                        runCalc={('right' === this.state.side)}
                                        playRoot={this.state.leftSideSorted && this.state.counter['right'] === 1 && this.state.sorted === true}
                                    />
                                </div>
                            </div>
                            <div>
                                <div
                                    className="infoText"
                                    style={{
                                        display: "flex",
                                        flexDirection: 'column',
                                        gap: 6,
                                        outline: "solid",
                                        padding: 6,
                                        textAlign: 'center',
                                        marginLeft: '15%',
                                        marginRight: '15%'
                                    }}
                                >
                                    <div><strong>Current Side: </strong> {(this.state.counter["right"] === 0 && this.state.counter["left"] === 0) ? 'Parent' : this.state.side}</div>
                                    <div><strong>Current Action: </strong>{this.state.infoMsg}</div>
                                    <div><strong>Status: </strong> In Progress</div>
                                </div>
                                <IncrementButton
                                    increaseCounter={this.increaseCounter}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <Button variant='contained' style={{ marginTop: 50, marginLeft: 50 }} onClick={() => { this.state.changeLevel("WalkThrough") }}>Skip to Level 2</Button>
            </WalkThroughProvider >
        )
    }
}

const AnimationBar = (props: { children: React.ReactNode, play: boolean }) => {

    const [hasRun, setRun] = useState(false)
    //@ts-ignore
    const { setAnimating } = useContext(WalkThroughContext);

    const [animateProps, api] = useSpring(() => ({
        y: -40, x: 0,
        opacity: 0,
        onRest: () => {
            setAnimating(false)
        }
    }))

    useLayoutEffect(() => {
        if (props.play && !hasRun) {
            setAnimating(true)
            setRun(true)
            api.start({
                y: 0, x: 0,
                opacity: 1
            })
        }
    })

    return (
        <animated.div style={{ ...animateProps }}>
            {props.children}
        </animated.div>
    )

}
