import {Component} from 'react';
import {Grid} from '@mui/material';

export default class Game extends Component {

    constructor(algorithm, array) {
        this.state = {
            algorithm: algorithm,
            array: array,
        }
    }

    render() {
        return (
            <div id="game">
                <div id="game-controls">
                    <Grid container>

                    </Grid>
                </div>
            </div>
        )
    }
}