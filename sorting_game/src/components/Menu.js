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
    
    const click = () => {
        setClicked((isClicked) ? (false) : (true))
        
        if(props.clickedArray.includes(props.element)){
            props.setClickedArray(props.clickedArray.filter(element => props.element !== element))
        }
        else{
            props.setClickedArray([...props.clickedArray, props.element])
        }
    }

    return (
        <div className={'cell'} style = {(isClicked) ? ({backgroundColor: 'red'}) : ({backgroundColor: 'blue'})} onClick={() => click()}>
            {props.element}
        </div>
    )
}

const GridContainer = () => {
    const [side, setSide] = useState('middle')

    const [clickedArray, setClickedArray] = useState(new Array())

    let state = store.getState()

    let arrJSX = (state.obj[new String(state.currentStep)].array)

    useEffect(()=> {
        console.log(clickedArray)
    })

    return (
        <div>
            {(side === 'middle') ? (
                <div className='grid'>
                    {arrJSX.map((element, i) => {
                        return (<Box key={i} element={element} allign='row' setClickedArray={setClickedArray} clickedArray={clickedArray} />)
                    })}
                    {

                    }

                </div>
            ) : (
                (side === 'left') ? (
                    <></>
                ) : (
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
            gameIsActive: false
        }
    }

    startGame = () => {
        store.dispatch({
            type: "LoadNew",
            payload: {
                array: createArray(this.state.size, this.state.range)
            }
        })

        this.setState({
            gameIsActive: true
        })
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