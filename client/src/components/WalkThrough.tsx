import { Button } from '@mui/material'
import React, { useContext } from "react"
import { WalkThroughProps, WalkThroughState } from '../types';
import { WalkThroughProvider, WalkThroughContext } from './WalkThroughProvider';
import { store } from '../Reducer';
import { Cell } from "./walkthroughComponents/Cell"
import { ArrayContainer } from './walkthroughComponents/ArrayContainer';

const messages = {
    split: "The parent array is being split into two child arrays.",
    start: "The starting unsorted array is split into two children arrays, starting with the left side.",
    sortMerge: "The child arrays are sorted and merged back into the parent array. \nThe two child arrays elements are compared one by one, adding the smallest element to the parent. ",
    complete: "The array has been succesfully merged and sorted."
}


const IncrementButton = () => {
    //@ts-ignore
    const { isAnimating, counter, setCounter } = useContext(WalkThroughContext);

    const increaseCounter = () => {

    }

    return (
        <Button
            onClick={() => { if (!isAnimating) increaseCounter() }}
            variant="contained"
            style={{ width: 140, height: 50, marginTop: 15, position: 'absolute', left: '46%' }}
        >Next!</Button>
    )
}

const GameHolder = () => {
    
}


export const WalkThrough = (props: WalkThroughProps) => {

    store.dispatch({
        type: 'addRoot',
        payload: [props.numArray[0][1], props.numArray[2][1], props.numArray[15][1]]
    })

    props.changeLevel,
    

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
                        <Button 
                            variant='contained' 
                            style={{ width: 140, height: 50, marginTop: 15, position: 'absolute', left: '46%', top: '39%' }} 
                            onClick={() => { this.state.changeLevel("WalkThrough") }}
                        >Next Level</Button>
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
                                <ArrayContainer
                                    numArray={this.state.numArray}
                                    sorted={(this.state.sorted || this.state.side === 'right')}
                                    values={[2, 3, 10, 4, 8, 5, 6]}
                                    runCalc={('left' === this.state.side)}
                                    side='left'

                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <ArrayContainer
                                    side='right'
                                    numArray={this.state.numArray}
                                    sorted={this.state.sorted && this.state.side !== 'left'}
                                    values={[15, 16, 23, 17, 21, 18, 19]}
                                    runCalc={('right' === this.state.side)}
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
                            <IncrementButton/>
                        </div>
                    </div>
                )}
            </div>
            <Button variant='contained' style={{ marginTop: 50, marginLeft: 50 }} onClick={() => { props.changeLevel("WalkThrough") }}>Skip to Level 2</Button>
        </WalkThroughProvider >
    )
}
