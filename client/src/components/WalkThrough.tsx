import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from "react"
import { WalkThroughProps, WalkThroughState } from '../types';
import { useSpring, animated } from 'react-spring'

const rowStyle = {
    display: "flex",
    gap: "10px",
    // alignItems: 'center',
    // justifyContent: 'center'
};

const start = {
    // backgroundColor: "green",
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center'
}

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

const Cell = (props: any) => {
    let numArray = props.numArray
    let animationProps = props.animationProps

    return (
        <Grid>
            {(props.sorted) ? (
                [].concat(numArray[1]).sort((a, b) => (a > b) ? 1 : -1).map((element: number) => {
                    return (
                        <Button style={{ backgroundColor: props.color, fontWeight: 'bolder', color: 'black' }} disabled={true} variant="outlined"> {element}</Button>

                    )
                })
            ) : (
                numArray[1].map((element: number) => {
                    return <Button style={{ backgroundColor: props.color, fontWeight: 'bolder', color: 'black' }} disabled={true} variant="outlined"> {element}</Button>
                })
            )}
        </Grid>
    )
}

const Sort = () => {

}

const Animation = (props: { children: React.ReactNode, play: boolean, colorOld: string, transition: { x: number, y: number }, colorNew: string }) => {
    console.log(props)

    const [styles, animate] = useSpring(() => ({ y: 0, x: 0, backgroundColor: props.colorOld }))

    useEffect(() => {
        if (props.play) {
            animate({
                backgroundColor: props.colorNew,
                ...props.transition,
                delay: 1000
            })
        }
    })

    return (
        <animated.div style={styles}>
            {props.children}
        </animated.div>
    )
}

const ArrayComp = (props: { numArray: Array<Array<Array<number>>>, counter: number, values: Array<number>, sorted: boolean }) => {
    //not actually a react component it just returns an array
    let numArray = props.numArray
    let counter = props.counter
    let values = props.values

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
        <Cell color='#ff5b5b' numArray={numArray[values[0]]} sorted={flipSorted(1)} />,
        <ArrayHolder>
            <Cell color='#ff5b5b' numArray={numArray[values[1]]} sorted={flipSorted(2)} />
            <Cell color='lightblue' numArray={numArray[values[2]]} sorted={false} />
        </ArrayHolder>,
        <ArrayHolder>
            <Cell
                color='#ff5b5b'
                numArray={numArray[values[3]]}
                sorted={flipSorted(3)}
            />
            <Cell
                color='lightblue'
                numArray={numArray[values[4]]}
                sorted={false}
            />
        </ArrayHolder>,
        <>
            <ArrayHolder>
                <Animation
                    play={(counter >= 4)}
                    transition={(numArray[values[5]][1][0] <= numArray[values[6]][1][0]) ? ({ x: 0, y: -46.5 }) : ({ x: 64, y: -46.5 })}
                    colorOld='#ff5b5b'
                    colorNew='#ff5b5b'
                >
                    <Button style={{ fontWeight: 'bolder', color: 'black' }} disabled={true} variant="outlined"> {numArray[values[5]][1][0]}</Button>
                </Animation>
                <Animation
                    play={(counter >= 4)}
                    transition={(numArray[values[5]][1][0] <= numArray[values[6]][1][0]) ? ({ x: -10, y: -46.5 }) : ({ x: -74, y: -46.5 })}
                    colorOld='lightblue'
                    colorNew='#ff5b5b'
                >
                    <Button style={{ fontWeight: 'bolder', color: 'black' }} disabled={true} variant="outlined"> {numArray[values[6]][1][0]}</Button>
                </Animation>
            </ArrayHolder>

        </>
    ]


    return (
        <>
            {arrComp.map((element: React.ReactNode, i: number) => {
                return (i < counter) ? (element) : (<></>)
            })}
        </>
    )
}

export default class WalkThrough extends React.Component<WalkThroughProps, WalkThroughState> {
    constructor(props: WalkThroughProps) {
        super(props)
        console.log(props.numArray)

        this.state = {
            numArray: props.numArray,
            counter: { 'left': 0, 'right': 0 },
            side: 'left',
            sorted: false,
            leftSideSorted: false,
            doneSorting: false,
            infoMsg: messages.start,
            changeLevel: props.changeLevel
        }
    }

    //if statements for handling the counter, flipping sides to display, and flipping if the counter should be increased/decreseased and controlling if we want the displayed to be sorted or not
    increaseCounter = () => {
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <strong style={{
                    textAlign: 'center'
                }}>Merge Sort Walkthrough</strong>
                <div style={start}>
                    <Cell numArray={this.state.numArray[0]} color='' sorted={this.state.doneSorting} />
                </div>

                {(this.state.doneSorting) ? (
                    <div className="infoText" style={{ display: "flex", flexDirection: 'column', outline: "solid", textAlign: 'center' }}>
                        <div><strong>Current Side: </strong> {((this.state.counter["right"] === 0 && this.state.counter["left"] === 0) || this.state.doneSorting === true) ? '' : this.state.side}</div>
                        <div><strong>Current Action: </strong>{messages.complete}</div>
                        <div><strong>Status: </strong> Complete</div>
                        <Button onClick={() => { this.state.changeLevel("WalkThrough") }}>Next Level</Button>
                    </div>
                ) : (
                    <>
                        <div style={start}>
                            <div style={rowStyle}>
                                <div className="Leftside" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                                    <ArrayComp
                                        numArray={this.state.numArray}
                                        sorted={(this.state.sorted || this.state.side === 'right')}
                                        counter={this.state.counter['left']}
                                        values={[2, 3, 10, 4, 8, 5, 6]}
                                    />

                                </div>
                                {(this.state.side === 'right') ? (
                                    <div className="Rightside" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                                        <ArrayComp
                                            numArray={this.state.numArray}
                                            sorted={this.state.sorted}
                                            counter={this.state.counter['right']}
                                            values={[15, 16, 23, 17, 21, 18, 19]}
                                        />

                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                        <div className="infoText" style={{ display: "flex", flexDirection: 'column', outline: "solid", textAlign: 'center' }}>
                            <div><strong>Current Side: </strong> {(this.state.counter["right"] === 0 && this.state.counter["left"] === 0) ? 'Parent' : this.state.side}</div>
                            <div><strong>Current Action: </strong>{this.state.infoMsg}</div>
                            <div><strong>Status: </strong> In Progress</div>
                        </div>
                        <Button onClick={this.increaseCounter} variant="contained" style={{ width: 140, height: 50 }} >Next!</Button>
                    </>
                )}
            </div>
        )
    }
}