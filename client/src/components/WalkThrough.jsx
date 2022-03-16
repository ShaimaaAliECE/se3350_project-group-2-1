import { Button, Grid } from '@mui/material'
import React, { useEffect } from "react"

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
function DoubleGroup(props) {
    return (
        <div style={{ display: "flex", gap: "10px" }}>
            {props.children}
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
                    return <Button style={{ backgroundColor: 'green', fontWeight: 'bolder', color: 'black' }} disabled="true" variant="outlined"> {element}</Button>
                })
            ) : (
                numArray[1].map((element) => {
                    return <Button style={{ backgroundColor: 'lightpink', fontWeight: 'bolder', color: 'black' }} disabled="true" variant="outlined"> {element}</Button>
                })
            )}
        </Grid>
    )
}

const ArrayComp = (props) => {
    let numArray = props.numArray
    let counter = props.counter
    let values = props.values
    let index = props.index

    const flipSorted = (level) => {
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

    useEffect(() => {
        console.log(index)
        console.log(counter)
    })

    return (
        (index === 1) ? (
            <>
                {console.log("first path")}
                <Cell numArray={numArray[values[index]]} color='lightpink' sorted={flipSorted(1)} />
                <ArrayComp
                    key={index + 1}
                    index={index + 1}
                    numArray={numArray}
                    sorted={props.sorted}
                    counter={counter}
                    values={values}
                />
            </>
        ) : (
            (index < counter) ? (
                <>
                    {console.log("second path")}
                    <DoubleGroup>
                        <Cell numArray={numArray[values[index + 1]]} color='lightpink' sorted={flipSorted(index + 1)} />
                        <Cell numArray={numArray[values[index + 2]]} color='lightblue' sorted={false} />
                    </DoubleGroup>

                    <ArrayComp
                        key={index + 1}
                        index={index + 1}
                        numArray={numArray}
                        sorted={props.sorted}
                        counter={counter}
                        values={values}
                    />
                </>
            ) : (<></>)
        )
    )
}


export default class WalkThrough extends React.Component {
    constructor(props) {
        super(props)
        console.log(props.numArray)
        
        let indexedArray = [2, 3, 10, 4, 8, 5, 6, 15, 16, 23, 17, 21, 18, 19]
        
        let properlySorted = indexedArray.map((element, i)=> {
            return props.numArray[element]
        })

        this.state = {
            numArray: props.numArray,
            counter: { 'left': 0, 'right': 0 },
            side: 'left',
            sorted: false,
            leftSideSorted: false,
            doneSorting: false,
            infoMsg: messages.start,
            nextLevel: props.changeLevel
        }
    }

    //if statements for handling the counter, flipping sides to display, and flipping if the counter should be increased/decreseased and controlling if we want the displayed to be sorted or not
    increaseCounter = () => {
        console.log(this.counter)
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

                {(this.state.doneSorting) ? (
                    <div className="infoText" style={{ display: "flex", flexDirection: 'column', outline: "solid", textAlign: 'center' }}>
                        <div><strong>Current Side: </strong> {((this.state.counter["right"] === 0 && this.state.counter["left"] === 0) || this.state.doneSorting === true) ? '' : this.state.side}</div>
                        <div><strong>Current Action: </strong>{messages.complete}</div>
                        <div><strong>Status: </strong> Complete</div>
                        <Button onClick={() => { this.state.nextLevel("WalkThrough") }}>Next Level</Button>
                    </div>
                ) : (
                    <>
                        <div style={start}>
                            <ArrayComp
                                key={0}
                                index={0}
                                numArray={this.state.numArray}
                                sorted={(this.state.sorted || this.state.side === 'right')}
                                counter={this.state.counter['left']}
                                values={[2, 3, 10, 4, 8, 5, 6]}
                            />
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