import { Button, Grid } from '@mui/material'
import { useEffect, useState, useRef } from "react"

/*
index of merged arrays
merged array [8]
merged array [9]
merged array [13]



*/

export default function WalkThrough(props) {
    //only thing i changed is the num array is already created so i passed it as a prop

    let walkThrough = []
    let numArray = props.numArray
    let [counter, setCounter] = useState(0);

    function increaseCounter(){
        setCounter(counter++);
    }

    for (let i = 0; i < numArray.length; i++) {
        let row = []
        //row.push(<strong>{numArray[i][0]}</strong>)
        for (let j = 0; j < numArray[i][1].length; j++) {
            console.log(numArray[i][1][j])
            row.push(<Button disabled="true" variant="outlined"> {numArray[i][1][j]}</Button>)
        }
        walkThrough.push(<Grid>{row}</Grid>);
    }

    const rowStyle = {
        display: "flex",
    };

    const leftSide = {
        background: "red",
        border: "solid"
    }

    const rightSide = {
        background: "blue",
        border: "solid"
    }

    const start = {
        background: "green",
        border: "solid"
    }

    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong>Merge Sort Walkthrough</strong>
            <div style={start}>
                {walkThrough[0]}
            </div>
            <div style={rowStyle}>
                <div className="Leftside">
                    <div style={rowStyle}>
                        <div style={leftSide}>{walkThrough[2]}</div>
                    </div>
                    <div style={rowStyle}>
                        <div style={leftSide}>{walkThrough[3]}</div><div style={rightSide}>{walkThrough[10]}</div>
                    </div>
                    <div style={rowStyle}>
                        <div style={leftSide}>{walkThrough[4]}</div><div style={rightSide}>{walkThrough[8]}</div>
                    </div>
                    <div style={rowStyle}>
                        <div style={leftSide}>{walkThrough[5]}</div><div style={rightSide}>{walkThrough[6]}</div>
                    </div>
                </div>
                <div className="Rightside">
                    <div style={rowStyle}>
                        <div style={rightSide}>{walkThrough[15]}</div>
                    </div>
                    <div style={rowStyle}>
                        <div style={leftSide}>{walkThrough[16]}</div><div style={rightSide}>{walkThrough[23]}</div>
                    </div>
                    <div style={rowStyle}>
                        <div style={leftSide}>{walkThrough[17]}</div><div style={rightSide}>{walkThrough[21]}</div>
                    </div>
                    <div style={rowStyle}>
                        <div style={leftSide}>{walkThrough[18]}</div><div style={rightSide}>{walkThrough[19]}</div>
                    </div>
                </div>
            </div>
        </div>
        <Button onClick={increaseCounter}  variant="contained" style={{ width: 140, height: 50 }} >Next!</Button>
        {walkThrough}
        </>
    )
}