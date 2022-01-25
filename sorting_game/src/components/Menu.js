import {Component} from 'react';
import {Grid} from '@mui/material';

export default class GameMenu extends Component {

    constructor() {
        this.state = {
            algorithm: 'mergesort',
            array: [],
            minNum: 0,
            maxNum: 20,
            startGame: false
        }
    }

    render() {
        return this.state.startGame ? (
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
                    </Grid>
                </Grid>
            </div>
        ) : (<Game algorithm={this.state.algorithm} array={this.state.array}></Game>)
    }
}