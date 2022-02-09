import { Grid, Button, Input } from "@mui/material"

/**
 * Component contains all game controls (allowing users to control game parameters)
 * @param props 
 * @returns 
 */
export default function GameMenu(props) {

    return (
        <div id="game-menu">
            <Grid container>
                <Grid item xs={4} xs={{display: 'flex', flexDirection: 'row'}}>
                    <><strong>Range: </strong></>
                    <Input value={props.range} onChange={(event) => {props.setRange(event.target.value)}}></Input>
                    <><strong>Size: </strong></>
                    <Input value={props.size} onChange={(event) => {props.setSize(event.target.value)}}></Input>
                    <Button onClick={props.startGame} variant="contained">Start Game</Button>
                    <Button onClick={props.restartGame} variant="contained">Restart</Button>
                </Grid>
            </Grid>
        </div>

    )
}