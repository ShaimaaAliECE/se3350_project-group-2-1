import { Button, Grid } from '@mui/material'
import { render } from '@testing-library/react'
import { useEffect, useState, useRef } from "react"

/*
index of merged arrays
merged array [8]
merged array [9]
merged array [13]

*/

const rowStyle = {
    display: "flex",
    gap: "10px",
};

const start = {
    // backgroundColor: "green",
    border: "solid",
    display: "flex",
    margin: 0
}

function LeftGroup(props) {
    return (
        <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ backgroundColor: "red", border: "solid" }}>{props.walkThrough}</div>
        </div>
    )
}

function RightGroup(props) {
    return (
        <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ backgroundColor: "blue", border: "solid" }}>{props.walkThrough}</div>
        </div>
    )
}

function DoubleGroup(props) {
    return (
        <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ backgroundColor: "red", border: "solid" }}>{props.leftWalkThrough}</div>
            <div style={{ backgroundColor: "blue", border: "solid" }}>{props.rightWalkThrough}</div>
        </div>
    )
}

export default function WalkThrough(props) {
    //only thing i changed is the num array is already created so i passed it as a prop

    let walkThrough = []
    let numArray = props.numArray
    let [counter, setCounter] = useState(0);
    let [side, setSide] = useState('left')

    function increaseCounter() {
        if (counter + 1 === 5) {
            setSide('right')
        }
        console.log(side)
        setCounter(counter + 1);
    }

    for (let i = 0; i < numArray.length; i++) {
        let row = []
        //row.push(<strong>{numArray[i][0]}</strong>)
        for (let j = 0; j < numArray[i][1].length; j++) {
            row.push(<Button disabled="true" variant="outlined"> {numArray[i][1][j]}</Button>)
        }
        walkThrough.push(<Grid>{row}</Grid>);
    }

    const leftGroupStack = [
        <LeftGroup walkThrough={walkThrough[2]}></LeftGroup>,
        <DoubleGroup leftWalkThrough={walkThrough[3]} rightWalkThrough={walkThrough[10]}></DoubleGroup>,
        <DoubleGroup leftWalkThrough={walkThrough[4]} rightWalkThrough={walkThrough[8]}></DoubleGroup>,
        <DoubleGroup leftWalkThrough={walkThrough[5]} rightWalkThrough={walkThrough[6]}></DoubleGroup>
    ]

    const rightGroupStack = [
        <RightGroup walkThrough={walkThrough[15]}></RightGroup>,
        <DoubleGroup leftWalkThrough={walkThrough[16]} rightWalkThrough={walkThrough[23]}></DoubleGroup>,
        <DoubleGroup leftWalkThrough={walkThrough[17]} rightWalkThrough={walkThrough[21]}></DoubleGroup>,
        <DoubleGroup leftWalkThrough={walkThrough[18]} rightWalkThrough={walkThrough[19]}></DoubleGroup>
    ]

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <strong>Merge Sort Walkthrough</strong>
                <div style={start}>
                    {walkThrough[0]}
                </div>
                <div style={rowStyle}>
                    <div className="Leftside" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                        {leftGroupStack.map((element, i) => {
                            return (i < counter) ? (element) : (<></>)
                        })}

                    </div>
                    {(side ==='right') ? ( 
                        <div className="Rightside" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                            {rightGroupStack.map((element, i) => {
                                return (i < (counter - 4)) ? (element) : (<></>)
                            })}

                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <Button onClick={increaseCounter} variant="contained" style={{ width: 140, height: 50 }} >Next!</Button>
        </>
    )
}