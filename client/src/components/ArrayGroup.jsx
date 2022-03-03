import { Button, Grid, Alert, Snackbar } from "@mui/material";
import { useEffect, useState, useRef } from "react"
import { ArrayStates } from "../utils/GameTypes";
import useSound from 'use-sound';
import checkSound from '../checkAudio.mp3'
import wrongSound from '../wrongAudio.mp3'

export default function ArrayGroup(props) {
    // State initialization
    const [arrayState, setArrayState] = useState(props.numArray.length === 1 ? ArrayStates.MERGED : ArrayStates.UNSORTED);
    const [mergedArray, setMergedArray] = useState(props.numArray.length == 1 ? [...props.numArray] : []); // Empty array to eventually be populated with the properly sorted values
    const [childArrays, setChildArrays] = useState(); // To hold ArrayGroup instances for the left and right sub-arrays (children)
    const [gameTime, setGameTime] = useState();
    const [level, setLevel] = useState(props.level);
    const [open, setOpen] = useState(true); // Used to store snackbar display status
    const [playSuccess] = useSound(checkSound);
    const [playFail] = useSound(wrongSound);
    const soundPlayed = useRef(props.numArray > 1);

    /**
     * Updates the merged list with a new value selected from child array
     * @param {number} value 
     */
    function pushToMerged(value) {
        setMergedArray([...mergedArray, value]);
    }

    /**
     * Handle "Split Array" button click event
     */
    function splitArray() {
        let splitIndex = Math.ceil(props.numArray.length / 2); // Index of the number to the left of the middle
        let leftArrayNums = props.numArray.slice(0, splitIndex);
        let rightArrayNums = props.numArray.slice(splitIndex, props.numArray.length);

        setChildArrays({
            leftArray: leftArrayNums,
            rightArray: rightArrayNums
        });
        setArrayState(ArrayStates.LEFT_SORTING);
    }

    /**
     * Callback function to handle array element button onclick event
     * @param {number} value 
     */
    function selectValue(el) {
        let value = parseInt(el.target.getAttribute("value"), 10);
        props.pushToMerged(value);
        el.target.style.display = "none";
    }

    function validateArray() {
        if (mergedArray.length > 1) {
            for (let i = 0; i < mergedArray.length - 1; i++) {
                if (mergedArray[i] > mergedArray[i + 1]) {
                    return false;
                }
            }
            return true;
        } else {
            return true
        }
    }

    /**
     * When the component is re-rendered (due to a change in state), check to see if the array has been successfully merged
     */
    useEffect(_ => {
        let isMerged = false;
        if (mergedArray.length == props.numArray.length) {
            // Validate that the array was sorted properly
            if (validateArray()) {
                setArrayState(ArrayStates.MERGED);
                if (!soundPlayed.current) {
                    playSuccess();
                    soundPlayed.current = true;
                }
                isMerged = true;
            } else {
                setArrayState(ArrayStates.FAILED_MERGE);
                if (!soundPlayed.current) {
                    playFail();
                    soundPlayed.current = true;
                }
            }
        }
        // Update the parent state appropriately
        if (arrayState === ArrayStates.MERGED || isMerged) {
            // If merging is complete, allow user to select numbers for upper-level merging
            if (props.label === "Left Array" && props.parentState !== ArrayStates.MERGING) {
                if (props.numArray.length === 1) {
                    props.setParentState(ArrayStates.MERGING);
                } else {
                    props.setParentState(ArrayStates.RIGHT_SORTING);
                }
            } else if (props.label === "Right Array" && props.parentState === ArrayStates.RIGHT_SORTING) {
                props.setParentState(ArrayStates.MERGING);
            }
        }
    });

    let splitArrayButton; // Only display the "Split Array" button if array is unsorted
    let arrayBlocks = []; // Stores array of components corresponding to each number in the array (only render when not merging)
    let children; // Only display child arrays if merging
    let mergedArrayLabel; // Shows the values currently in the merged array (when applicable)
    if (arrayState === ArrayStates.UNSORTED) {
        if (props.depth === 0 && gameTime === undefined) {
            setGameTime(new Date().getTime());
        }
        // When not ready to merge, present option to split array
        let splitArrayDisabled = false;
        if (props.parentState === ArrayStates.LEFT_SORTING && props.label === "Right Array") {
            splitArrayDisabled = true;
        }
        splitArrayButton = (<Button disabled={splitArrayDisabled} onClick={splitArray} variant="contained">Split</Button>);

        for (let i = 0; i < props.numArray.length; i++) {
            let elementKey = `${props.index}-${i}`; // Unique identifier structure: {array key} - {element index}
            arrayBlocks.push([
                <Button disabled={arrayState !== ArrayStates.MERGED} key={elementKey} value={props.numArray[i]} onClick={selectValue} variant="outlined">{props.numArray[i]}</Button>
            ]);
        }
    } else if (arrayState === ArrayStates.MERGED) {
        // If merge was successful, display buttons and make them clickable
        for (let i = 0; i < mergedArray.length; i++) {
            let elementKey = `${props.index}-${i}`; // Unique identifier structure: {array key} - {element index}
            arrayBlocks.push([
                <Button disabled={props.parentState !== ArrayStates.MERGING} key={elementKey} value={mergedArray[i]} onClick={selectValue} variant="outlined">{mergedArray[i]}</Button>
            ]);
        }
    } else if (arrayState === ArrayStates.FAILED_MERGE) {
        for (let i = 0; i < mergedArray.length; i++) {
            let elementKey = `${props.index}-${i}`; // Unique identifier structure: {array key} - {element index}
            arrayBlocks.push([
                <Button disabled={false} variant="outlined" color="error" key={elementKey} value={mergedArray[i]}>{mergedArray[i]}</Button>
            ]);
        }
    } else if (arrayState === ArrayStates.MERGING) {
        // If the child arrays are merging into the parent, display the mergedArray numbers as buttons (or instruction text if nothing has merged yet)
        if (mergedArray.length === 0) {
            mergedArrayLabel = <Button disabled={true} variant="outlined">Click Numbers to Merge</Button>
        } else {
            mergedArrayLabel = mergedArray.map((el, i) => {
                return <Button disabled={true} key={i} variant="outlined">{el}</Button>
            });
        }
    } else if (arrayState === ArrayStates.LEFT_SORTING || arrayState === ArrayStates.RIGHT_SORTING) {
        mergedArrayLabel = <Button disabled={true} variant="outlined">Sort Child Arrays</Button>
    }

    /*
        Handling for closing out snackbars
    */
    let timeAlert;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    if (arrayState === ArrayStates.MERGED && props.numArray.length > 1) {
        let timeDelta = (new Date().getTime() - gameTime) / 1000 + ' seconds to complete! '; // Total time to complete level only displayed if ArrayGroup depth == 0
        let msg = 'Correct!';
        let typeOfFinishAlert = 'success';

        timeAlert = <Snackbar open={open} autoHideDuration={1200} onClose={handleClose}>
            <Alert onClose={handleClose} severity={typeOfFinishAlert} sx={{ width: '100%' }}>
                {(props.depth === 0 ? timeDelta : '') + msg}
            </Alert>
        </Snackbar> // green popup on

    } else if (arrayState === ArrayStates.FAILED_MERGE) {
        let msg = 'Incorrect! Try Again!';
        let typeOfFinishAlert = 'error';

        timeAlert = <Snackbar open={open} autoHideDuration={1200} onClose={handleClose}>
            <Alert onClose={handleClose} severity={typeOfFinishAlert} sx={{ width: '100%' }}>
                {msg}
            </Alert>

        </Snackbar> // green popup on
    }

    // Render child arrays if not in merged state
    if (childArrays !== undefined) {
        if (arrayState !== ArrayStates.MERGED) {
            children = <Grid container>
                <Grid item xs={6}>
                    <ArrayGroup parentState={arrayState} setParentState={setArrayState} label="Left Array" depth={props.depth + 1} key={0} mergedArray={mergedArray} pushToMerged={pushToMerged} numArray={childArrays.leftArray} />
                </Grid>
                <Grid item xs={6}>
                    <ArrayGroup parentState={arrayState} setParentState={setArrayState} label="Right Array" depth={props.depth + 1} key={1} mergedArray={mergedArray} pushToMerged={pushToMerged} numArray={childArrays.rightArray} />
                </Grid>
            </Grid>
        }
    }

    return (
        <div className="array-group">
            <Grid container>
                {timeAlert}
                <Grid className="array-group-header" item xs={12}>
                    <h4>{props.label}</h4>
                </Grid>
                <Grid className="array-group-header" item xs={12}>
                    {splitArrayButton}
                </Grid>
            </Grid>
            <Grid className="array-group-body" container>
                {mergedArrayLabel}
                {arrayBlocks}
                {children}
            </Grid>
        </div>
    )
}