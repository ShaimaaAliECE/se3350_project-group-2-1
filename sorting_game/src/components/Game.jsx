import { useState, useRef } from "react";
import MergeSort from "../utils/sorting/MergeSort.js";
import ArrayGroup from "./ArrayGroup.jsx";
import Githubicon from "../images/Githubicon.js";
import {
    Grid,
    TextField,
    Button,
    AppBar,
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormLabel,
    Toolbar
} from '@mui/material'

const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <div>Array Sorting Game</div>
                <Githubicon />
            </Toolbar>
        </AppBar>
    )
}

/**
 * React component containing all functionality related to the sorting game (renders the game)
 * @param props 
 */
export default function Game(props) {
    // State initialization
    const isRunning = useRef(false); // Game is not running by default (give users a chance to set game parameters)
    const [gameArray, setGameArray] = useState([]); // Multi-dimensional array that stores each "layer" of the merge sort
    const [arrayGroup, setArrayGroup] = useState();
    const [mergedArray, setMergedArray] = useState([]);

    const [gameType, setGameType] = useState("Merge Sort")

    //size, range state -> array params
    const [range, setRange] = useState(10);
    const [size, setSize] = useState(10);

    function setMerged(value) {
        // Add value to merged array
    }

    /**
     * Helper function to handle on click event for "Start Game" button
     */
    function startGame() {
        if (!isRunning.current) {
            let numArray = MergeSort(new Number(size), new Number(range));
            setGameArray(numArray[0][1]);
            setArrayGroup(<ArrayGroup gameRunning={isRunning} label="Root Array" depth={0} key={1} index={1} mergedArray={mergedArray} pushToMerged={setMerged} numArray={numArray[0][1]} />);
            isRunning.current = true;
        }
    }

    function restartGame() {
        setGameArray([]);
        setArrayGroup(<></>);
        isRunning.current = false;
    }

    return (
        <div id="sorting-game">
            <NavBar />
            <div id="game-menu" style={{ marginTop: 15, marginLeft: 20, display: 'flex', flexDirection: 'row' }}>
                <FormControl style={{ width: 200 }}>
                    <FormLabel id="demo-controlled-radio-buttons-group">Algorithim Type</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={gameType}
                        onChange={(event) => setGameType(event.target.value)}
                    >
                        <FormControlLabel value="Merge Sort" control={<Radio />} label="Merge Sort" />
                        <FormControlLabel value="Quick Sort" control={<Radio />} label="Quick Sort" />
                    </RadioGroup>
                </FormControl>
                <Grid container style={{ marginLeft: 60 }}>
                    <Grid item xs={4} xs={{ display: 'flex', flexDirection: 'row' }}>
                        <FormLabel id="demo-controlled-radio-buttons-group">Array content</FormLabel>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                style={{ marginTop: 10 }}
                                value={range}
                                onChange={(event) => setRange(event.target.value)}
                                label="Range"
                                id="outlined-size-small"
                                defaultValue="Small"
                                size="small"
                            ></TextField>
                            <TextField
                                style={{ marginTop: 20}}
                                value={size}
                                onChange={(event) => { setSize(event.target.value) }}
                                label="Size"
                                id="outlined-size-small"
                                defaultValue="Small"
                                size="small"
                            ></TextField>
                        </div>
                    </Grid>
                    <Button onClick={startGame} variant="contained">Start Game</Button>
                    <Button onClick={restartGame} variant="contained">Restart</Button>
                </Grid>

            </div>
            {arrayGroup}
        </div>
    )
}