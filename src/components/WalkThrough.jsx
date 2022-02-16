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

const HardCodedSide = (props) => {
    let numArray = props.numArray
    let index = props.index
    let values = props.values

    const flipSorted = (level) => {
        if(props.sorted){
            if(level >= index){
                return true
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }

    return ( 
        [
            <Cell numArray={numArray[values[0]]} color='red' sorted = {flipSorted(1)} />,
            <DoubleGroup
                leftWalkThrough={<Cell numArray={numArray[values[1]]} color='red' sorted={flipSorted(2)} />}
                rightWalkThrough={<Cell numArray={numArray[values[2]]} color='blue' sorted={props.sorted} />}>
            </DoubleGroup>,
            <DoubleGroup
                leftWalkThrough={<Cell numArray={numArray[values[3]]} color='red' sorted={flipSorted(3)} />}
                rightWalkThrough={<Cell numArray={numArray[values[4]]} color='blue' sorted={props.sorted} />}>
            </DoubleGroup>,
            <DoubleGroup
                leftWalkThrough={<Cell numArray={numArray[values[5]]} color='red' sorted={flipSorted(4)} />}
                rightWalkThrough={<Cell numArray={numArray[values[6]]} color='blue' sorted={props.sorted} />}>
            </DoubleGroup>
        ]
    )
}

export default function WalkThrough(props) {
    //only thing i changed is the num array is already created so i passed it as a prop

    let walkThrough = []
    let numArray = props.numArray
    let [counter, setCounter] = useState(0);
    let [side, setSide] = useState('left')
    let [sorted, setSorted] = useState(false)

    function increaseCounter() {
        if (counter + 1 === 5) {
            setSorted(true)
        }
        if(sorted === true){
            setCounter(counter - 1)
        }
        if(sorted !== true){
            setCounter(counter+1)
        }
        if(counter === 0 && sorted === true){
            setSide('right')
            setSorted(false)
        }
    }

    useEffect(()=>{
        console.log(counter)
        console.log(sorted)
    })

    const leftGroupStack = HardCodedSide({numArray: numArray, sorted: sorted, index: counter, values: [2,3,10,4,8,5,6]})

    const rightGroupStack = HardCodedSide({numArray: numArray, sorted: sorted, index: counter,  values: [15,16,23,17,21,18,19]})

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