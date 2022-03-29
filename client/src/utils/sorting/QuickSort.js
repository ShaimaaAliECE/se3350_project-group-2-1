import { Button } from "@mui/material";
import { useState } from "react";

export default function QuickSort() {
    const [stepsBtn, setStepsBtn] = useState(false);
    var items = [5,3,7,6,2,9];
    let initialState = [5,3,7,6,2,9];
    var steps = [];
    function sort(items, leftIndex, rightIndex){
        var temp = items[leftIndex];
        items[leftIndex] = items[rightIndex];
        items[rightIndex] = temp;
    }
    function split(items, left, right) {
        var pivot   = items[Math.floor((right + left) / 2)], //middle element
            i       = left, //left pointer
            j       = right; //right pointer
        while (i <= j) {
            while (items[i] < pivot) {
                i++;
            }
            while (items[j] > pivot) {
                j--;
            }
            if (i <= j) {
                sort(items, i, j);
                i++;
                j--;
            }
        }
        return i;
    }

function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        steps.push('split array');
        index = split(items, left, right); //index returned from partition
        if (left < index - 1) {
            steps.push('sort from left side of pivot');
            quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            steps.push('sort from right side of pivot');
            quickSort(items, index, right);
        }
    }
    return items;
}
var sortedArray = quickSort(items, 0, items.length - 1); //prints [2,3,5,6,7,9]

function displayArray(array) {
    let stateofArray = [];
    for (let i = 0; i < array.length; i++) {
        stateofArray.push(
            <Button disabled={false} variant="outlined" key={i}>{array[i]}</Button>
        )}
    return stateofArray;
}

function displaySteps() {
    let textSteps = [];
    for (let i = 0; i < steps.length; i++) {
        textSteps.push(<p>{steps[i]}</p>);
    }
    return textSteps;
}

return (
    <div id='quick-sort' style={{ display: 'flex', flexDirection: 'column' }}>
        <br />
        <h2 style={{ marginBottom: 0}}>Example of the Quick Sort algorithm:</h2>
        <p style={{ marginBottom: 0}}>*For future reference when implementing other sorting algorithms</p>
        <h3>Initial State: </h3>
        <div style={{ display: 'flex', flexDirection: 'row'}}>{displayArray(initialState)}</div>
        <br />
        <Button variant='contained' onClick={()=> stepsBtn ? setStepsBtn(false) : setStepsBtn(true)}>STEPS</Button>
        {stepsBtn ? displaySteps() : <br />}
        <h3>Final State: </h3>
        <div style={{ display: 'flex', flexDirection: 'row'}}>{displayArray(sortedArray)}</div>
    </div>
)
}