import { Button, Grid } from '@mui/material'
import { render } from '@testing-library/react'
import React from "react"

const rowStyle = {
    display: "flex",
    gap: "10px",
};

const start = {
    // backgroundColor: "green",
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center'
}

//contains a holder for the group, for styling purposes, should probably be fixed up
function DoubleGroup(props) {
    return (
        <div style={{ display: "flex", gap: "10px" }}>
            <div>{props.leftWalkThrough}</div>
            <div>{props.rightWalkThrough}</div>
        </div>
    )
}

const Cell = (props) => {
    let numArray = props.numArray
    //return a grid containing the array, return either a sorted version or the orignal scrambled version
    return (
        <Grid>
            {(props.sorted) ? (
                [].concat(numArray[1]).sort((a, b) => (a > b) ? 1 : -1).map((element) => {
                    return <Button style={{ backgroundColor: props.color }} disabled="true" variant="outlined"> {element}</Button>   
                })
            ) : (
                numArray[1].map((element) => {
                    return <Button style={{ backgroundColor: props.color }} disabled="true" variant="outlined"> {element}</Button>
                })
            )}
        </Grid>
    )
}

const HardCodedSide = (props) => {
    //not actually a react component it just returns an array
    let numArray = props.numArray
    let index = props.index
    let values = props.values

    //for determining if it should be sorted or not based on the level its at vs the counter position
    const flipSorted = (level) => {
        if (props.sorted) {
            if (level >= index) {
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

    return (
        [
            <Cell numArray={numArray[values[0]]} color='red' sorted={flipSorted(1)} />,
            <DoubleGroup
                leftWalkThrough={<Cell numArray={numArray[values[1]]} color='red' sorted={flipSorted(2)} />}
                rightWalkThrough={<Cell numArray={numArray[values[2]]} color='blue' sorted={props.sorted} />}>
            </DoubleGroup>,
            <DoubleGroup
                leftWalkThrough={<Cell numArray={numArray[values[3]]} color='red' sorted={flipSorted(3)} />}
                rightWalkThrough={<Cell numArray={numArray[values[4]]} color='blue' sorted={props.sorted} />}>
            </DoubleGroup>,
            <DoubleGroup
                leftWalkThrough={<Cell numArray={numArray[values[5]]} color='red' sorted={flipSorted(4)} />}
                rightWalkThrough={<Cell numArray={numArray[values[6]]} color='blue' sorted={props.sorted} />}>
            </DoubleGroup>
        ]
    )
}

export default class WalkThrough extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numArray: props.numArray,
            counter: { 'left': 0, 'right': 0 },
            side: 'left',
            sorted: false,
            leftSideSorted: false,
            doneSorting: false
        }
    }

    //if statements for handling the counter, flipping sides to display, and flipping if the counter should be increased/decreseased and controlling if we want the displayed to be sorted or not
    increaseCounter = () => {
        if (this.state.leftSideSorted && this.state.counter['right'] === 1 && this.state.sorted === true) {
            this.setState({
                doneSorting: true
            })
        }
        else {
            if (this.state.counter[this.state.side] === 1 && this.state.sorted === true) {
                this.setState(prevState => {
                    return {
                        side: 'right',
                        sorted: false,
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
                    console.log("right path")
                    this.setState(prevState => {
                        return {
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
        console.log(this.state.counter)
        console.log(this.state.sorted)
        console.log(this.state.side)

        //hard coded sides, values is for the index of the array from sams generators, this should definetly be a proper component but hey
        const leftGroupStack = HardCodedSide({
            numArray: this.state.numArray,
            sorted: (this.state.sorted || this.state.side === 'right'),
            index: this.state.counter['left'],
            values: [2, 3, 10, 4, 8, 5, 6]
        })
        const rightGroupStack = HardCodedSide({
            numArray: this.state.numArray,
            sorted: this.state.sorted,
            index: this.state.counter['right'],
            values: [15, 16, 23, 17, 21, 18, 19]
        })

        //hard coded sides are displayed with the map function, only elements that have an index greater than the counter are shown
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <strong style={{
                    textAlign: 'center'
                }}>Merge Sort Walkthrough</strong>
                <div style={start}>
                    <Cell numArray={this.state.numArray[0]} color='' sorted={this.state.doneSorting} />
                </div>

                {(this.state.doneSorting) ? (<div>Done Sorting, clear game</div>) : (
                    <>
                        <div style={rowStyle}>
                            <div className="Leftside" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                                {leftGroupStack.map((element, i) => {
                                    return (i < this.state.counter['left']) ? (element) : (<></>)
                                })}

                            </div>
                            {(this.state.side === 'right') ? (
                                <div className="Rightside" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                                    {rightGroupStack.map((element, i) => {
                                        return (i < this.state.counter['right']) ? (element) : (<></>)
                                    })}

                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <Button onClick={this.increaseCounter} variant="contained" style={{ width: 140, height: 50 }} >Next!</Button>
                    </>
                )}
            </div>
        )
    }
}