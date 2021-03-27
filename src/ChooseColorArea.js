import React from 'react';
import Board from "./Board.js"

export default class ChooseColorArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color : ""
        }
        this.handleClickBlack = this.handleClickBlack.bind(this)
        this.handleClickWhite = this.handleClickWhite.bind(this)



    }
    handleClickWhite() {
        this.setState((state) => {
            state.color = "white"
            this.props.callBack(state.color);
            return state
        });
    }
    handleClickBlack() {
        this.setState((state) => {
            state.color = "black"
            this.props.callBack(state.color);
            return state
        });

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

    componentWillUnmount(){
        this.props.callBack(this.state.color);

    }





    render(){


        return <div className="colorarea">
            <button style = {this.getButtonStyle("white")} onClick={this.handleClickWhite}></button>
            <button style = {this.getButtonStyle("black")} onClick={this.handleClickBlack}></button>
            </ div>
    }






}