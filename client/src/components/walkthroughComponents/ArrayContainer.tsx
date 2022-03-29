import { store } from "../../Reducer"
import { useState } from "react"
import { Cell } from "./Cell";
import { AnimationBar, AnimationElement } from "./Animation";
import { Button } from '@mui/material'


const ArrayHolder = (props: { children: React.ReactNode }) => {
    return (
        <div style={{ display: "flex", gap: "10px" }}>
            {props.children}
        </div>
    )
}

export const ArrayContainer = (props: { playRoot: boolean, side: string, numArray: Array<Array<Array<number>>>, counter: number, runCalc: boolean, values: Array<number>, sorted: boolean }) => {
    //not actually a react component it just returns an array
    let numArray = props.numArray
    let counter = props.counter
    let values = props.values

    console.log("containerValue: "+ counter)

    const [hasCalc, setCalc] = useState(false)

    if (!hasCalc && props.runCalc) {
        let organized = values.map((element: any) => {
            return numArray[element][1]
        })

        store.dispatch({
            type: 'addArrays',
            payload: organized
        })
        setCalc(true)
    }

    //for determining if it should be sorted or not based on the level its at vs the counter position
    const flipSorted = (level: any) => {
        if (props.sorted) {
            if (level >= counter) {
                return true
            }
            else {
                return false
            }
        }
        else {
            return false
        }
    }

    let arrComp = [
        <AnimationBar
            play={!flipSorted(1) && counter === 1}
        >
            <Cell key={0} side={props.side} counter={counter} play={props.playRoot} color='#ff5b5b' numArray={numArray[values[0]]} sorted={flipSorted(1)} />
        </AnimationBar>,

        <AnimationBar
            play={!flipSorted(2) && counter === 2}
        >
            <ArrayHolder key={1}>
                <Cell key={2} side='left' counter={counter} play={flipSorted(2) && counter === 2} color='#ff5b5b' numArray={numArray[values[1]]} sorted={flipSorted(2)} />
                <Cell key={3} side='right' counter={counter} play={flipSorted(2) && counter === 2} color='#ff5b5b' numArray={numArray[values[2]]} sorted={flipSorted(2)} />
            </ArrayHolder >
        </AnimationBar>,

        <AnimationBar
            play={!flipSorted(3) && counter === 3}
        >
            <ArrayHolder key={4}>
                <ArrayHolder key={5}>
                    <Cell key={6} side='left' counter={counter} play={flipSorted(3) && (counter === 3)} color='#ff5b5b' numArray={numArray[values[3]]} sorted={flipSorted(3)} />
                    <Cell key={7} side='right' counter={counter} play={flipSorted(3) && (counter === 3)} color='lightblue' numArray={numArray[values[4]]} sorted={flipSorted(3)} />
                </ArrayHolder>
                <AnimationElement
                    key={8}
                    play={flipSorted(3) && counter === 3}
                    colorOld='#ff5b5b'
                    colorNew='#ff5b5b'
                    transition={(numArray[values[2]][1][0] <= numArray[values[2]][1][1]) ? ({ x: -10, y: -46.5 }) : ({ x: 54, y: -46.5 })}
                >
                    <Button key={9} style={{ backgroundColor: '#ff5b5b', fontWeight: 'bolder', color: 'black' }} disabled={true} variant="outlined"> {numArray[values[2]][1][0]}</Button>
                </AnimationElement>
                <AnimationElement
                    key={10}
                    play={flipSorted(3) && counter === 3}
                    colorOld='lightblue'
                    colorNew='#ff5b5b'
                    transition={(numArray[values[2]][1][0] <= numArray[values[2]][1][1]) ? ({ x: -20, y: -46.5 }) : ({ x: -84, y: -46.5 })}
                >
                    <Button key={11} style={{ fontWeight: 'bolder', color: 'black' }} disabled={true} variant="outlined"> {numArray[values[2]][1][1]}</Button>
                </AnimationElement>
            </ArrayHolder>
        </AnimationBar>,
        <AnimationBar
            play={!flipSorted(4) && counter === 4}
        >
            <ArrayHolder key={12} >
                <AnimationElement
                    key={13}
                    play={counter === 4}
                    colorOld='#ff5b5b'
                    colorNew='#ff5b5b'
                    transition={(numArray[values[5]][1][0] <= numArray[values[6]][1][0]) ? ({ x: 0, y: -46 }) : ({ x: 64, y: -46 })}
                >
                    <Button key={16} style={{ fontWeight: 'bolder', color: 'black', backgroundColor: "#ff5b5b" }} disabled={true} variant="outlined"> {numArray[values[5]][1][0]}</Button>
                </AnimationElement>
                <AnimationElement
                    key={14}
                    play={counter === 4}
                    colorOld="lightblue"
                    colorNew='#ff5b5b'
                    transition={(numArray[values[5]][1][0] <= numArray[values[6]][1][0]) ? ({ x: -10, y: -46 }) : ({ x: -74, y: -46 })}
                >
                    <Button key={15} style={{ fontWeight: 'bolder', color: 'black' }} disabled={true} variant="outlined"> {numArray[values[6]][1][0]}</Button>
                </AnimationElement>
            </ArrayHolder>
        </AnimationBar>
    ]

    return (
        <>
            {arrComp.map((element: React.ReactNode, i: number) => {
                return (i < counter) ? (element) : (<a style={{ width: 64, height: 36.5 }}></a>)
            })}
        </>
    )
}