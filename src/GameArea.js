import React from 'react';
import Board from "./Board.js"
import ChooseColorArea from "./ChooseColorArea";

export default class GameArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board : ["K", "KN", "R", "E", "E", "R", "KN", "K"],
            whiteTurn : true,
            counter : 0,
            playerColor : ""
        }
        this.handleResetClick = this.handleResetClick.bind(this)
    }

    callbackFunction = (childData) => {
        this.setState((state) => {
            state.playerColor = childData
            state.counter +=1
            return state
        });
    }

    handleResetClick(){
        this.setState((state) => {
            state.counter += 1
            return state
        });
    }

    render(){
        const game = <div className="gamearea">
            <button onClick={this.handleResetClick}>Reset</button>
            <Board key = {this.state.counter} board = {this.state.board} playerColor = {this.state.playerColor} />
            <ChooseColorArea callBack = {this.callbackFunction} />
        </div>
        return game
    }






}