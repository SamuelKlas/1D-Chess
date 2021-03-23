import React from 'react';
import ReactDOM from 'react-dom';
import Board from "./Board.js"


ReactDOM.render(
    <div>
        <Board playerColor = "black"/>
    </div>,
    document.getElementById('root')
);