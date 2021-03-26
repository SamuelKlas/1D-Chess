import React from 'react';
import ReactDOM from 'react-dom';
import Board from "./Board.js"
import GameArea from "./GameArea";
import ChooseColorArea from "./ChooseColorArea";


ReactDOM.render(
    <div>
        <GameArea playerColor = "black"/>
    </div>,
    document.getElementById('root')
);