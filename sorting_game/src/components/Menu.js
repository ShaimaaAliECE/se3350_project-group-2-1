import { Component } from 'react';
import { Grid, FormControlLabel, FormControl, RadioGroup, Radio, FormLabel, Button, TextField } from '@mui/material';
import createArray from '../utils/numberGenerator'

const ArrayBox = (props) => {
    return (
        <div>
            {props.value}
        </div>
    )
}

export default class Game extends Component {
    constructor() {
        super()
        this.state = {
            algorithm: 'mergesort',
            array: [],
            size: '',
            range: '',
            gameIsActive: false
        }
    }

    generateArray = () => {
        console.log(createArray(this.state.size, this.state.range))
        this.setState({
            array: createArray(this.state.size, this.state.range),
            gameIsActive: true
        })
    }

    render() {
        let array = <></>

        if (this.state.gameIsActive) {
            array = this.state.array.map((element, i) => {
                console.log(element)
                return <ArrayBox key={i} value={element} />
            })
        }

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
                                }}></TextField>
                            <TextField
                                placeholder='size'
                                value={this.state.size}
                                onChange={(event) => {
                                    this.setState({
                                        size: event.target.value
                                    })
                                }}></TextField>
                        </Grid>
                        <Button onClick={() => {
                            this.generateArray()
                        }}> Start Game</Button>
                    </Grid>
                </div>
                <div style={{display: 'flex', }}>
                    {array}
                </div>
            </div>
        )
    }
}