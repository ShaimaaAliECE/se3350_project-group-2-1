import { useState, useRef } from "react";
import GameMenu from "./GameMenu.jsx";
import MergeSort from "../utils/sorting/MergeSort.js";
import ArrayGroup from "./ArrayGroup.jsx";

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

    function restartGame(){
        if (isRunning.current) {
            setGameArray([]);
            setArrayGroup(<></>);
            isRunning.current = false;
        }
    }

    return (
        <div id="sorting-game">
            <GameMenu startGame={startGame} restartGame={restartGame} setRange={setRange} setSize={setSize} size={size} range={range}/>
            {arrayGroup}
        </div>
    )
}