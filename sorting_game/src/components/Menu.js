import { Component } from 'react';
import { Grid, FormControlLabel, FormControl, RadioGroup, Radio, FormLabel, Button, TextField } from '@mui/material';
import createArray from '../utils/numberGenerator'
import store from '../utils/Reducer'

const EmptyBox = (props) => {

}

const FilledBox = (props) => {
    return (
        <div>
            <div style={{ display: 'inline-grid' }}>
                {props.array.map((element, i) => {
                    return <div> {element} </div>
                })}
            </div>
        </div>
    )
}

const GridContainer = () => {
    let filled = new Array(store.getState().currentStep + 1)
    let obj = store.getState().obj

    filled.map(() => {
        return obj[new String(filled.length)].map((element) => {
            return (<FilledBox array={element} />)
        })
    })

    return (
        <div>
            {filled}
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

        console.log(store.getState())

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
                <div style={{ display: 'grid' }}>
                    {(this.state.gameIsActive) ? (
                        <GridContainer />
                    ) : (<></>)}
                </div>
            </div>
        )
    }
}