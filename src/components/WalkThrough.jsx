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
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center'
}

function DoubleGroup(props) {
    return (
        <div style={{ display: "flex", gap: "10px" }}>
            <div>{props.leftWalkThrough}</div>
            <div>{props.rightWalkThrough}</div>
        </div>
    )
}

const Cell = (props) => {
    let numArray = props.numArray
    console.log("success")

    return (
        <Grid>
            {(props.sorted) ? (
                [].concat(numArray[1])
                .sort((a, b) => a > b ? 1 : -1)
                .map((item, i) =>
                    <Button style={{ backgroundColor: props.color }} disabled="true" variant="outlined"> {item}</Button>
                )
            ) : (
                numArray[1].map((element) => {
                    return <Button style={{ backgroundColor: props.color }} disabled="true" variant="outlined"> {element}</Button>
                }
            ))}
        </Grid>
    )
}

const 

export default function WalkThrough(props) {
    //only thing i changed is the num array is already created so i passed it as a prop

    let walkThrough = []
    let numArray = props.numArray
    let [counter, setCounter] = useState(0);
    let [side, setSide] = useState('left')

    function increaseCounter() {
        if (counter + 1 === 5) {

        }
        console.log(side)
        setCounter(counter + 1);
    }

    const leftGroupStack = [
        <Cell numArray={numArray[2]} color='red'/>,
        <DoubleGroup
            leftWalkThrough={<Cell numArray={numArray[3]} color='red' />}
            rightWalkThrough={<Cell numArray={numArray[10]} color='blue' />}>
        </DoubleGroup>,
        <DoubleGroup
            leftWalkThrough={<Cell numArray={numArray[4]} color='red' />}
            rightWalkThrough={<Cell numArray={numArray[8]} color='blue' />}>
        </DoubleGroup>,
        <DoubleGroup
            leftWalkThrough={<Cell numArray={numArray[5]} color='red' />}
            rightWalkThrough={<Cell numArray={numArray[6]} color='blue' />}>
        </DoubleGroup>
    ]

    const rightGroupStack = [
        <Cell numArray={numArray[15]} color='red' />,
        <DoubleGroup
            leftWalkThrough={<Cell numArray={numArray[16]} color='red' />}
            rightWalkThrough={<Cell numArray={numArray[23]} color='blue' />}>
        </DoubleGroup>,
        <DoubleGroup
            leftWalkThrough={<Cell numArray={numArray[17]} color='red' />}
            rightWalkThrough={<Cell numArray={numArray[21]} color='blue' />}>
        </DoubleGroup>,
        <DoubleGroup
            leftWalkThrough={<Cell numArray={numArray[18]} color='red' />}
            rightWalkThrough={<Cell numArray={numArray[19]} color='blue' />}>
        </DoubleGroup>
    ]

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <strong style={{
                    textAlign: 'center'
                }}>Merge Sort Walkthrough</strong>
                <div style={start}>
                    <Cell numArray={numArray[0]} color='' />
                </div>
                <div style={rowStyle}>
                    <div className="Leftside" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                        {leftGroupStack.map((element, i) => {
                            return (i < counter) ? (element) : (<></>)
                        })}

                    </div>
                    {(side === 'right') ? (
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