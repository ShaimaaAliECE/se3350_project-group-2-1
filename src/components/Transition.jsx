import { useState, useRef } from "react";
import ArrayGroup from "./ArrayGroup";
import { Button } from "@mui/material";
import Game from './Game';

export default function Transition(props) {
    const [level, setLevel] = useState(props.level);
    const [startNextLevel, setStart] = useState();

    function LevelUp() {
        setLevel(props.level);
        setStart(true);
    }

    return (
        <div>
            <Button size='large' onClick={LevelUp} variant="contained">Level {props.msg}</Button>
            {(startNextLevel) ? (<Game level={level}/>) : (<></>)}
        </div>
    )
}