import React from 'react';
import ReactDOM from 'react-dom';
import Board from "./Board.js"
import GameArea from "./GameArea";
import ChooseColorArea from "./ChooseColorArea";
import styles from "./styles.css"

ReactDOM.render(
    <div >
        <h1>1D Chess</h1>
        <GameArea playerColor = "black"/>
    </div>,
    document.getElementById('root')
);