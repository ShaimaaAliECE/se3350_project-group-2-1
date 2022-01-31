import { Component, useEffect, useState } from 'react';
import { Grid, FormControlLabel, FormControl, RadioGroup, Radio, FormLabel, Button, TextField } from '@mui/material';
import createArray from '../utils/numberGenerator'
import store from '../utils/Reducer'
import '../App.css'

const EmptyBox = (props) => {
    return (
        <></>
    )
}

const Box = (props) => {
    const [isClicked, setClicked] = useState(false)
    let state = store.getState()
    const click = () => {
        //flip the element as being either clicked or not clicked with true/false
        setClicked((isClicked) ? (false) : (true))
        
        let newArr = new Array()

        //if the state array already contains the element, then remove it, id'd with its key
        if (state.clickedArray.includes(props.element)) {
            
            newArr = state.clickedArray.filter(element => props.id !== element.id)
        }
        //if the state array doesnt contain the element, add it to the clicked array
        else {
            newArr = [...state.clickedArray, {element: props.element, id: props.id}]
        }
        
        //store the new array into the store
        store.dispatch({
            type: "ChangeClickedArray",
            payload: {
                array: newArr
            }
        })
    }

    useEffect(()=> {
        console.log(state.clickedArray)
    })

    return (
        <div 
            className={'cell'} 
            style={(isClicked) ? ({ backgroundColor: 'red' }) : ({ backgroundColor: 'blue' })} 
            onClick={() => click()}
        >
            {props.element}
        </div>
    )
}

const GridContainer = () => {
    //state for which side component is rendering, set to left, right or middle, and the render comps will change
    const [side, setSide] = useState('middle')

    let state = store.getState()

    //current array rendering 
    let arrJSX = (state.stepsObject[new String(state.currentStep)].array)

    return (
        <div>
            {(side === 'middle') ? (
                /* middle rendering*/
                <div className='grid'>
                    {arrJSX.map((element, i) => {
                        return (<Box key={i} id={i} element={element} allign='row'/>)
                    })}
                </div>
            ) : (
                (side === 'left') ? (
                    /* left side rendering*/
                    <></>
                ) : (
                    /* right side side rendering*/
                    <></>
                )
            )}
        </div>
    )
}

export default class Game extends Component {
    constructor() {
        super()
        this.state = {
            algorithm: 'mergesort',
            size: '',
            range: '',
            error: 0,
            isSplit:'true', // a false split is a sort step
            gameIsActive: false
        }
    }

    startGame = () => {
        /*  
            on button click, load the new array into the Reducer from the create array 
        */
        store.dispatch({
            type: "LoadNew",
            payload: {
                array: createArray(new Number(this.state.size), new Number(this.state.range))
            }
        })
        //render the game comp
        this.setState({
            gameIsActive: true
        })
    }

    resetGame = () => {
        /*
            on button click, reload game with same array and sort solition
        */
        store.dispatch({
            type: "LoadNew",
            payload: {
                array: createArray(new Number(this.state.size), new Number(this.state.range))
            }
        })
        //render the game comp
        this.setState({
            gameIsActive: true
        })
    }

    wrongMove = () => {
        /*
            on button click, reload game with entry conditions
        */
        store.dispatch({
            /*
            functionality payload for a error state over 3
            */
        })
        //render the game comp
        this.setState({
            error: error++
        })
    }

    moveTypePrompt = () =>{
        /*
            on a given move, function will enable a toggle prompt for a split or sort
        */
        let isSplit = this.typeOfStep ? this.setState({typeOfStep: false}) : this.setState({typeOfStep: true})
        
        /*
            deliver string input to user based on the toggle of boolean above that flips state
                a true isSplit will prompt a split text and the opposite a order array instruction
        */
    }

    render() {
        return (
            <div id="game">
                <div id="game-controls">
                    <Grid container>
                        <Grid item xs={4}>
                            <FormControl>
                                <FormLabel id="algorithm-selector">Algorithm</FormLabel>
                                <RadioGroup
                                    aria-labelledby="algorithm-selector"
                                    defaultValue="mergesort"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="mergesort" control={<Radio />} label="Merge Sort" />
                                    <FormControlLabel value="othersort" control={<Radio />} label="OtherSort" />
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                placeholder='range'
                                value={this.state.range}
                                onChange={(event) => {
                                    this.setState({
                                        range: event.target.value
                                    })
                                }}>
                            </TextField>
                            <TextField
                                placeholder='size'
                                value={this.state.size}
                                onChange={(event) => {
                                    this.setState({
                                        size: event.target.value
                                    })
                                }}>
                            </TextField>
                        </Grid>
                        <Button onClick={() => {
                            this.startGame()
                        }}> Start Game </Button>
                        <Button onClick={() => {
                            this.startGame() //
                        }}> Reset Game </Button>
                    </Grid>
                </div>
                <div>
                    {(this.state.gameIsActive) ? (
                        <GridContainer />
                    ) : (<></>)}
                </div>
            </div>
        )
    }
}