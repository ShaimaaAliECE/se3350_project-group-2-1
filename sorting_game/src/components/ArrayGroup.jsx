import { Button, Grid, Alert,Snackbar } from "@mui/material";
import { useEffect, useState, useRef } from "react"


export default function ArrayGroup(props) {
    // State initialization
    const [merging, setMerging] = useState(false || props.numArray.length == 1); // Boolean variable to declare whether the user should be splitting the array further (implying it is UNSORTED) or merge with another array (implying it is SORTED)
    const [merged, setMerged] = useState(false || props.numArray.length == 1);
    const [mergedArray, setMergedArray] = useState(props.numArray.length == 1 ? [...props.numArray] : []); // Empty array to eventually be populated with the properly sorted values
    const [childArrays, setChildArrays] = useState(); // To hold ArrayGroup instances for the left and right sub-arrays (children)
    const[gameTime, setGameTime] = useState();

    let mergedRef = useRef([]); // Used to store shared instance of the merged array (which is then transferred to the mergedArray state hook)

    /**
     * Updates the merged list with a new value selected from child array
     * @param {number} value 
     */
    function pushToMerged(value) {
        let updatedArray = [...mergedRef.current, value]
        mergedRef.current = updatedArray;
        setMergedArray(updatedArray);
    }
    
    /**
     * Handle "Split Array" button click event
     */
    function splitArray() {
        let splitIndex = Math.floor(props.numArray.length / 2); // Index of the number to the left of the middle
        let leftArrayNums = props.numArray.slice(0, splitIndex);
        let rightArrayNums = props.numArray.slice(splitIndex, props.numArray.length);
        
        let leftArray = <ArrayGroup label="Left Array" depth={props.depth + 1} key={0} mergedArray={mergedArray} pushToMerged={pushToMerged} numArray={leftArrayNums} />
        let rightArray = <ArrayGroup label="Right Array" depth={props.depth + 1} key={1} mergedArray={mergedArray} pushToMerged={pushToMerged} numArray={rightArrayNums} />
        let childrenArrays = <Grid container>
            <Grid item xs={6}>{leftArray}</Grid>
            <Grid item xs={6}>{rightArray}</Grid>
        </Grid>

        setChildArrays(childrenArrays);
        setMerging(true);
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

    /**
     * When the component is re-rendered (due to a change in state), check to see if the array has been successfully merged
     */
    useEffect(_ => {
        if (mergedArray.length == props.numArray.length) {
            setMerged(true);
        }
    }, [mergedArray.length, props.numArray.length]);


    let splitArrayButton; // Only display the "Split Array" button if the array is unsorted
    let arrayBlocks = []; // Stores array of components corresponding to each number in the array (only render when not merging)
    let children; // Only display child arrays if merging
    let mergedArrayLabel; // Shows the values currently in the merged array (when applicable)
    if (!merging) {
        if (props.depth === 0 && gameTime === undefined) {
            setGameTime(new Date().getTime());
        }
        // When not ready to merge, present option to split array
        splitArrayButton = (<Grid item xs={12}>
            <Button onClick={splitArray} variant="contained">Split Array</Button>
        </Grid>);

        for (let i = 0; i < props.numArray.length; i++) {
            let elementKey = `${props.index}-${i}`; // Unique identifier structure: {array key} - {element index}
            arrayBlocks.push([
                <Button disabled={!merged} key={elementKey} value={props.numArray[i]} onClick={selectValue} variant="outlined">{props.numArray[i]}</Button>
            ]);
        }
    } else if (merged) {
        
        // If merging is complete, allow user to select numbers for upper-level merging
        for (let i = 0; i < mergedArray.length; i++) {
            let elementKey = `${props.index}-${i}`; // Unique identifier structure: {array key} - {element index}
            arrayBlocks.push([
                <Button disabled={!merged} key={elementKey} value={mergedArray[i]} onClick={selectValue} variant="outlined">{mergedArray[i]}</Button>
            ]);
        }
    } else {
        // If the child arrays are merging into the parent, display the mergedArray label
        mergedArrayLabel = mergedArray.toString();
        children = childArrays;
    }

    let timeAlert;
    if (merged) {
        if (props.depth === 0) {
            let timeDelta = (new Date().getTime() - gameTime) / 1000; // from the time level 0 is presented till full sort
            timeAlert = <Snackbar open={true} autoHideDuration={1}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    {timeDelta + ' seconds to complete!'}
                </Alert>
            </Snackbar> // green popup on 
            props.gameRunning.current = false;
        }
    }

    return (
        <div className="array-group">
            <Grid container>
                {timeAlert}
                <h4>{props.label}</h4>
                {splitArrayButton}
                <Grid item xs={12}>
                    {mergedArrayLabel}
                    {arrayBlocks}
                    {children}
                </Grid>
            </Grid>
        </div>
    )
}