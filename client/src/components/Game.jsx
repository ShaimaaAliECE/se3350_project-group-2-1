import { useState, useRef } from "react";
import { useIdleTimer } from 'react-idle-timer';
import MergeSort from "../utils/sorting/MergeSort.js";
import ArrayGroup from "./ArrayGroup.jsx";
import Githubicon from "../images/Githubicon.js";
import WalkThrough from "./WalkThrough.tsx";


import {
    Grid,
    TextField,
    Button,
    AppBar,
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

    const [gameMode, setGameMode] = useState("playable") //for picking between walkthrough or playable
    const [level, setLevel] = useState(props.startLevel || 0); // To store max level completed by the user
    const [gameLevel, setGameLevel] = useState(props.startLevel || 0); // To store level selected for play by user
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
        if (gameLevel > level) {
            setLevel(gameLevel);
        }
        restart();
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

    // After 5 minutes of inactivity, the session times out and restarts
    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: 1000 * 60 * 5,
        onIdle: _ => {
            alert('Timeout due to inactivity!');
            restartGame();
        },
        debounce: 500
    });

    // function determining game level
    function startGame(mode, selectedLevel) {
        if (!isRunning.current) {
            // Parameters for each level
            let gameSize;
            let gameRange;
            switch (selectedLevel) {
                case 2:
                    gameSize = 10;
                    gameRange = 20;
                    break;
                case 3:
                    gameSize = 10;
                    gameRange = 20;
                    break;
                case 4:
                    gameSize = 20;
                    gameRange = 50;
                    break;
                case 5:
                    gameSize = 50;
                    gameRange = 100;
                    break;
                case 6:
                    // Custom level
                    gameSize = size;
                    gameRange = range;
                    break;
                default:
                    gameSize = 10;
                    gameRange = 20;
            }
            let numArray = MergeSort(gameSize, gameRange);
            setGameArray(numArray);
            setGameMode(mode);
            setGameLevel(selectedLevel);
            isRunning.current = true;
        }
    }

    return (
        ((!quitGame) ? (
            <div id="sorting-game">
                <NavBar />
                <div id="game-menu" style={{ marginTop: 25, marginLeft: 20, display: 'flex', flexDirection: 'row' }}>
                    <Grid container style={{ marginLeft: 40 }}>
                        <Grid item xs={1} style={{ display: 'flex', flexDirection: 'column' }}>
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
                                    disabled={level < 5}
                                ></TextField>
                                <TextField
                                    style={{ marginTop: 20 }}
                                    value={size}
                                    onChange={(event) => setSize(event.target.value)}
                                    label="Size"
                                    id="outlined-size-small"
                                    defaultValue="Small"
                                    size="small"
                                    disabled={level < 5}
                                ></TextField>
                            </div>
                        </Grid>
                        <div style={{ marginLeft: 70, marginTop: 50 }}>
                            {/* this section is for button display, either clear game or the start game options are shown*/}
                            {(!isRunning.current) ? (
                                //buttons for starting or doing the walkthough, need to be styled
                                <>
                                    <div>
                                        <Button
                                            onClick={() => startGame("walkthrough", 1)}
                                            variant="contained"
                                            style={{ width: 140, height: 50, marginLeft: 20 }}
                                        >Level 1</Button>
                                        <Button
                                            onClick={() => startGame("playable", 2)}
                                            variant="contained"
                                            style={{ width: 140, height: 50, display: ((level >= 1) ? 'show' : 'none'), marginLeft: 20 }}
                                        >Level 2</Button>
                                        <Button
                                            onClick={() => startGame("animation", 3)}
                                            variant="contained"
                                            style={{ width: 140, height: 50, display: ((level >= 2) ? 'show' : 'none'), marginLeft: 20 }}
                                        >Level 3</Button>
                                        <Button
                                            onClick={() => startGame("animation", 4)}
                                            variant="contained"
                                            style={{ width: 140, height: 50, display: ((level >= 3) ? 'show' : 'none'), marginLeft: 20 }}
                                        >Level 4</Button>
                                        <Button
                                            onClick={() => startGame("animation", 5)}
                                            variant="contained"
                                            style={{ width: 140, height: 50, display: ((level >= 4) ? 'show' : 'none'), marginLeft: 20 }}
                                        >Level 5</Button>
                                        <Button
                                            onClick={() => startGame("animation", 6)}
                                            variant="contained"
                                            style={{ width: 140, height: 50, display: ((level >= 5) ? 'show' : 'none'), marginLeft: 20 }}
                                        >Custom</Button>
                                        <div style={{ display: ((!mistake) ? 'show' : 'none') }}>
                                            <h2>You have made the maximum number of mistakes.</h2>
                                            <h3>You can now either: </h3>
                                            <ul>
                                                <li style={{ padding: '5px' }}>
                                                    <Button variant='contained' onClick={() => restartGame()}>Restart Game from Level 1</Button>
                                                </li>
                                                <li style={{ padding: '5px' }}>
                                                    <h3>Go back to a previous level</h3>
                                                </li>
                                                <li style={{ padding: '5px' }}>
                                                    <Button variant='contained' onClick={() => setGame(true)}>Quit Game</Button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="outlined"
                                        style={{ width: 140, height: 50, marginRight: 20 }}
                                    >
                                        Mistakes Left: {mistake}
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setGameArray([]);
                                            isRunning.current = false;
                                        }}
                                        style={{ width: 160, height: 50, fontSize: 15, }}
                                        variant="contained">
                                        Restart Game
                                    </Button>
                                </>
                            )}
                        </div>
                    </Grid>
                </div >
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
                                changeLevel={incrLevel}
                            />
                        ) : (
                            <></>
                        )
                    ) : (
                        <></>
                    )}
                </div>
            </div >
        ) : (
            <div style={{ textAlign: 'center' }}>
                <h1 >Thank you for playing!</h1>
                <h2>If you'd like to play again, click here!</h2>
                <Button variant='contained' style={{ fontSize: '20px' }} onClick={() => restartGame()}>New Game</Button>
            </div>
        ))
    )
}
