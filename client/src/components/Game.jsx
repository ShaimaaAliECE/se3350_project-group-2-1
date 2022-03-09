import { useState, useRef, useEffect } from "react";
import MergeSort from "../utils/sorting/MergeSort.js";
import ArrayGroup from "./ArrayGroup.jsx";
import Githubicon from "../images/Githubicon.js";
import WalkThrough from "./WalkThrough.jsx";

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

/**
 * Navigation bar at top of screen, add elements to the toolbar part like drop downs etc
 *
 */

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
    const [mergedArray, setMergedArray] = useState([]);

    const [gameType, setGameType] = useState("Merge Sort") //for picking between the different sorting
    const [gameMode, setGameMode] = useState("playable") //for picking between walkthrough or playable
    const [level, setLevel] = useState(0);
    const [mistake, setMistake] = useState(3);
    const [quitGame, setGame] = useState(false);


    //size, range state -> array params
    const [range, setRange] = useState(20);
    const [size, setSize] = useState(10);

    function setMerged(value) {
        // Add value to merged array
    }

    const restart = () => {
        setGameArray([]);
        isRunning.current = false;
    }

    //increaseing the level, only increase once for each comp, definetley a better way to do it but...
    const incrLevel = (comp) => {
        if (comp === 'WalkThrough' && !(level >= 1)) {
            restart()
            setLevel(level + 1)
        }
        if (comp === 'WalkThrough' && level >= 1) {
            restart()
        }
        else {
            restart()
            setLevel(level + 1)
        }
    }

    const mistakeCounter = () => {
            setMistake(mistake - 1);
            restart(); 
    }

    const restartGame = () => {
        setLevel(0);
        setMistake(3);
        setGame(false);
        restart();
    }

    // function determining game level
    function startGame(mode) {

        //pass in game mode for determining which button was pushed, start game or walkthough
        if (mode === 'walkthrough') {
            if (!isRunning.current) {
                let numArray = MergeSort(10, 20);
                setGameArray(numArray);
                setGameMode(mode);
                isRunning.current = true;
            }
        }
        if (!isRunning.current) {
            let numArray = MergeSort(new Number(size), new Number(range));
            setGameArray(numArray);
            setGameMode(mode);
            isRunning.current = true;
        }
    }

    useEffect(() => {
        console.log(level)
    })

    return (
        ((!quitGame) ? (
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
                        <FormControlLabel
                            style={{ marginTop: 10 }}
                            value="Merge Sort"
                            control={<Radio />}
                            label="Merge Sort"
                        />
                        <FormControlLabel
                            style={{ marginTop: 10 }}
                            value="Quick Sort"
                            control={<Radio />}
                            label="Quick Sort"
                        />
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
                                style={{ marginTop: 20 }}
                                value={size}
                                onChange={(event) => setSize(event.target.value)}
                                label="Size"
                                id="outlined-size-small"
                                defaultValue="Small"
                                size="small"
                            ></TextField>
                        </div>
                    </Grid>
                    <div>
                {(isRunning.current) ? (
                    <Grid fontSize={20}>Mistakes Left: {mistake}</Grid>
                    ) : <></>
                    }
                </div>
                    <div style={{ marginLeft: 70, marginTop: 50 }}>
                        {/* this section is for button display, either clear game or the start game options are shown*/}
                        {(!isRunning.current) ? (
                            //buttons for starting or doing the walkthough, need to be styled
                            <>
                                <div>
                                <Button
                                    onClick={() => startGame("walkthrough")}
                                    variant="contained"
                                    style={{ width: 140, height: 50 }}
                                >Level 1</Button>
                                <Button
                                    onClick={() => startGame("playable")}
                                    variant="contained"
                                    style={{ width: 140, height: 50, display: ((level >= 1) ? 'show' : 'none') }}
                                >Level 2</Button>
                                <Button
                                    onClick={() => startGame("animation")}
                                    variant="contained"
                                    style={{ width: 140, height: 50, display: ((level >= 2) ? 'show' : 'none') }}
                                >Level 3</Button>
                                <div style={{display: ((!mistake) ? 'show' : 'none')}}>
                                    <h2>You have made the maximum number of mistakes.</h2>
                                    <h3>You can now either: </h3>
                                    <ul>
                                        <li style={{padding: '5px'}}>
                                            <Button variant='contained' onClick={() => restartGame()}>Restart Game from Level 1</Button>
                                        </li>
                                        <li style={{padding: '5px'}}>
                                            <h3>Go back to a previous level</h3>
                                        </li>
                                        <li style={{padding: '5px'}}>
                                            <Button variant='contained' onClick={() => setGame(true)}>Quit Game</Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            </>
                        ) : (
                            <Button
                                onClick={() => {
                                    setGameArray([]);
                                    isRunning.current = false;
                                }}
                                style={{ width: 160, height: 50, fontSize: 15, }}
                                variant="contained">
                                Restart Game
                            </Button>
                        )}
                    </div>
                </Grid>
            </div>
            <div>
                {(isRunning.current) ? (
                    //for loading the game, if game is running then...
                    (gameMode === "playable") ? (
                        //if gamemode is playable then load the array group
                        <ArrayGroup
                            gameRunning={isRunning}
                            label="Root Array"
                            depth={0}
                            key={1}
                            index={1}
                            level={2}
                            mergedArray={mergedArray}
                            pushToMerged={setMerged}
                            numArray={gameArray[0][1]}
                            changeLevel={incrLevel}
                            mistakeCount={mistakeCounter}
                        />
                    ) : (gameMode === "walkthrough") ? (
                        //if gamemode is anything else load the walkthrough
                        <WalkThrough
                            numArray={gameArray}
                            changeLevel={incrLevel}
                        />
                    ) : (gameMode === "animation") ? (
                        //else for nothing if game isnt running
                        <ArrayGroup
                            gameRunning={isRunning}
                            label="Root Array"
                            depth={0}
                            key={1}
                            index={1}
                            level={3}
                            mergedArray={mergedArray}
                            pushToMerged={setMerged}
                            numArray={gameArray[0][1]}
                        />
                    ) : (
                        <></>
                    )
                ) : (
                    <></>
                )}
            </div>
        </div>
        ) : (
            <div style={{textAlign: 'center'}}>
            <h1 >Thank you for playing!</h1>
            <h2>If you'd like to play again, click here!</h2> 
            <Button variant='contained' style={{ fontSize: '20px'}} onClick={() => restartGame()}>New Game</Button>
        </div>
        ))
    )
}
