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
        this.handleBackToSelectClick = this.handleBackToSelectClick.bind(this)
    }

    callbackFunction = (childData) => {
        this.setState((state) => {
            state.playerColor = childData
            return state
        });
    }

    handleResetClick(){
        this.setState((state) => {
            state.counter += 1
            return state
        });
    }

    handleBackToSelectClick(){
        this.setState((state) => {
            state.playerColor = ""
            return state
        });
    }



    render(){


        const selection = <ChooseColorArea callBack = {this.callbackFunction} />
        const game = <div>
            <button onClick={this.handleResetClick}>Reset</button>
            <Board key = {this.state.counter} board = {this.state.board} playerColor = {this.state.playerColor} />
            <button onClick={this.handleBackToSelectClick}>Back to selection</button>
        </div>
        return this.state.playerColor === "" ? selection : game
    }






}