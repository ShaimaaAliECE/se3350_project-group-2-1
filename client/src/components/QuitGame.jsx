import React from 'react';
import Game from './Game';
import { Button } from '@mui/material';

export default function QuitGame() {
    const newGame = () => {
        <Game />
    }
    return (
        <div>
            <h1>Thank you for playing!</h1>
            <h2>If you'd like to play again, click here!</h2> 
            <Button onClick={() => newGame()}>New Game</Button>
        </div>
    )
}