import React from 'react';
import Board from "./Board.js"

export default class ChooseColorArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color : ""
        }
        this.sendData = this.sendData.bind(this)
        this.handleClickBlack = this.handleClickBlack.bind(this)
        this.handleClickWhite = this.handleClickWhite.bind(this)



    }
    handleClickWhite() {
        this.setState( {
            color : "white"
        })
    }
    handleClickBlack() {
        this.setState( {
            color : "black"
        })
    }

    sendData() {
        this.props.callBack(this.state.color);
    }

    getButtonStyle(color){
        return {
            width: "100px", height: "100px",
            backgroundColor: "transparent",
            border: "none",
            backgroundImage: `url("http://localhost:3000/${color}King.png")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%"
        }
    }





    render(){


        return <div>
            <p>Choose your side</p>
            <button style = {this.getButtonStyle("white")} onClick={this.handleClickWhite}></button>
            <button style = {this.getButtonStyle("black")} onClick={this.handleClickBlack}></button>
            <button onClick={this.sendData}>Ok</button>
            </ div>
    }






}