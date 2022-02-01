import { useState, useEffect } from "react";
import GameMenu from "./GameMenu";
import generateArray from "../utils/arrayGenerator";
import ArrayGroup from "./ArrayGroup";

/**
 * React component containing all functionality related to the sorting game (renders the game)
 * @param props 
 */
export default function Game(props) {
    // State initialization
    const [isRunning, setIsRunning] = useState(false); // Game is not running by default (give users a chance to set game parameters)
    const [gameArray, setGameArray] = useState([]); // Multi-dimensional array that stores each "layer" of the merge sort
    const [arrayGroup, setArrayGroup] = useState();
    const [mergedArray, setMergedArray] = useState([]);

    function setMerged(value) {
        // Add value to merged array
    }

    /**
     * Helper function to handle on click event for "Start Game" button
     */
    function startGame() {
        if (!isRunning) {
            let numArray = generateArray(10, 1, 20)
            setGameArray(numArray);
            setArrayGroup(<ArrayGroup label="Root Array" depth={0} key={1} index={1} mergedArray={mergedArray} pushToMerged={setMerged} numArray={numArray} />);
            setIsRunning(true);
        }
    }
    return (
        <div id="sorting-game">
            <GameMenu startGame={startGame}/>
            {arrayGroup}
        </div>
    )
}