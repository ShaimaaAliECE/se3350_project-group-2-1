import { Grid, Button } from "@mui/material"

/**
 * Component contains all game controls (allowing users to control game parameters)
 * @param props 
 * @returns 
 */
export default function GameMenu(props) {

    return (
        <div id="game-menu">
            <Grid container>
                <Grid item xs={4}>
                    <Button onClick={props.startGame} variant="contained">Start Game</Button>
                </Grid>
            </Grid>
        </div>

    )
}