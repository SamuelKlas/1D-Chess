import React from 'react';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        const b = ["K", "KN", "R", "E", "E", "R", "KN", "K"]
        const bo = b.map(d => ({piece: d, highlighted: false, id: 0}))
        for (let i = 0; i < 8; i++) {
            bo[i].id = i;
            bo[i].isWhite = i < 4 ? true : false

        }
        this.handleClick = this.handleClick.bind(this);
        this.highlightSquares = this.highlightSquares.bind(this);
        this.calcAllMoves = this.calcAllMoves.bind(this);

        this.state = {
            board: bo,
            selectedId: null,
            whiteTurn: true,
            overMessage : ""
        }


    }

    componentDidMount() {
        this.setState((state) => {
            state.currMoves = this.calcValidMoves();
            return state
        });

    }

    rookMove(state, id) {
        const ids = []
        ids.push(id)
        const intId = parseInt(id)
        const square = state.board[id]
        for (let i = intId + 1; i < 8; i++) {
            const target = state.board[i]
            if (target.piece === "E") {
                ids.push(i);
            } else if (target.isWhite === !square.isWhite) {
                ids.push(i);
                break;
            } else if (target.isWhite === square.isWhite) {
                break;
            }

        }
        for (let i = intId - 1; i >= 0; i--) {
            const target = state.board[i]
            if (target.piece === "E") {
                ids.push(i);
            } else if (target.isWhite === !square.isWhite) {
                ids.push(i);
                break;
            } else if (target.isWhite === square.isWhite) {
                break;
            }

        }
        return ids
    }

    kingMove(state, id) {
        const ids = []
        const intId = parseInt(id)
        const square = state.board[intId]

        if (this.isOnboard(intId + 1)) {
            if (state.board[intId + 1].isWhite === !square.isWhite || state.board[intId + 1].piece === "E")
                ids.push(intId + 1)
        }
        if (this.isOnboard(intId - 1)) {
            if (state.board[intId - 1].isWhite === !square.isWhite || state.board[intId - 1].piece === "E") ids.push(intId - 1)
        }
        return ids
    }

    calcAllMoves() {
        let moves = []
        for (let i = 0; i < 8; i++) {
            let ids = []
            const square = this.state.board[i]
            if (square.isWhite !== this.state.whiteTurn) continue;
            switch (square.piece) {
                case "R":
                    ids = this.rookMove(this.state, i)
                    break;
                case "K":
                    ids = this.kingMove(this.state, i)
                    break;
                case "KN":
                    ids = this.knightMove(this.state, i)
                    break;
                case "E":
                    break;
            }
            ids.forEach(idd => i !== idd ? moves.push({attacker: i, target: idd}) : "")
        }
        return moves

    }

    tryMove(copyState, attackerId, targetId) {
        const attacker = copyState.board[attackerId]
        let kingId = null

        copyState.board[targetId].piece = attacker.piece
        copyState.board[targetId].isWhite = attacker.isWhite
        copyState.board[attackerId].piece = "E"

        for (let i = 0; i < 8; i++) {
            if (copyState.board[i].piece === "K" && copyState.board[i].isWhite === copyState.whiteTurn) kingId = i
        }


        for (let i = 0; i < 8; i++) {
            let ids = []
            const square = copyState.board[i]

            if (square.isWhite === copyState.whiteTurn) continue;
            switch (square.piece) {
                case "R":
                    ids = this.rookMove(copyState, i)
                    break;
                case "K":
                    ids = this.kingMove(copyState, i)
                    break;
                case "KN":
                    ids = this.knightMove(copyState, i)
                    break;
                case "E":
                    ids = []
                    break;

            }
            let unsafeMoves = ids.filter(idd => idd === kingId)
            if (unsafeMoves.length !== 0) {
                return false
            }


        }
        return true

    }

    calcValidMoves() {
        let unsafeMoves = []
        let moves = this.calcAllMoves()

        for (let i = 0; i < moves.length; i++) {
            let copyState = JSON.parse(JSON.stringify(this.state))
            if (this.tryMove(copyState, moves[i].attacker, moves[i].target) === false) {
                unsafeMoves.push({attacker: moves[i].attacker, target: moves[i].target})
            }


        }
        for (let i = 0; i < moves.length; i++) {
            let move = moves[i]
            for (let j = 0; j < unsafeMoves.length; j++) {
                if (move.attacker === unsafeMoves[j].attacker && move.target === unsafeMoves[j].target) {
                    move.attacker = -1
                    break;
                }
            }
        }

        let newMoves = moves.filter(move => move.attacker !== -1)

        return newMoves

    }

    mapping(id) {
        let intId = parseInt(id)
        let ret = ""
        const square = this.state.board[intId]
        ret += square.isWhite ? "white" : "black"
        switch (square.piece) {
            case "R":
                ret += "Rook"
                break;
            case "K":
                ret += "King"
                break;
            case "KN":
                ret += "Knight"
                break;
            case "E":
                ret = ""
                break;

        }
        return ret
    }

    isOnboard(id) {
        const intId = parseInt(id)
        return intId >= 0 && intId < 8;
    }

    knightMove(state, id) {
        const ids = []
        const intId = parseInt(id)
        ids.push(intId)
        const square = state.board[intId]

        if (this.isOnboard(intId + 2)) {
            if (state.board[intId + 2].isWhite === !square.isWhite || state.board[intId + 2].piece === "E")
                ids.push(intId + 2)
        }
        if (this.isOnboard(intId - 2)) {
            if (state.board[intId - 2].isWhite === !square.isWhite || state.board[intId - 2].piece === "E") ids.push(intId - 2)
        }
        return ids
    }


    highlightSquares(ids, selectedId) {
        this.setState((state) => {
            ids.forEach(id => state.board[id].highlighted = true)

            state.selectedId = selectedId
            return state
        });
    }

    isKingInCheck(moves) {
        let kingId = -1
        for (let i = 0; i < 8; i++) {
            if (this.state.board[i].piece === "K" && this.state.board[i].isWhite === !this.state.whiteTurn) kingId = i
        }
        return moves.some(move => move.target == kingId)

    }

    makeMove(state,id){
        const attacker = state.board[state.selectedId]
        state.board[id].piece = attacker.piece
        state.board[id].isWhite = attacker.isWhite
        state.board[state.selectedId].piece = "E"
        state.selectedId = null
        state.board.forEach(square => square.highlighted = false)
        state.whiteTurn = !state.whiteTurn
    }

    handleClick(id) {
        if (this.state.board[id].highlighted == true) {
            this.setState((state) => {
                this.makeMove(state,id)
                state.currMoves = this.calcValidMoves()
                if (state.currMoves.length === 0) {
                    state.whiteTurn = !state.whiteTurn
                    let moves = this.calcValidMoves()
                    let inCheck = this.isKingInCheck(moves)
                    if (inCheck == true) {
                        let winner = this.state.whiteTurn == true ? "White" : "Black"
                        this.state.overMessage ="Game over : " + winner + " wins by checkmate"
                    } else {
                        this.state.overMessage = "Game over : draw by stalemate"
                    }
                }
                return state

            });
        } else {
            this.setState((state) => {
                state.board.forEach(b => b.highlighted = false)
                return state
            });
            let intId = parseInt(id)
            let targets = []
            let moves = this.state.currMoves.filter(move => move.attacker === intId)
            moves.forEach(move => targets.push(move.target))
            this.highlightSquares(targets, id)
        }


    }

    getColor(id) {
        const rgb = id % 2 == 0 ? {r : 125, g : 135,b : 150} : {r : 232, g : 235,b : 239}
        if(this.state.board[id].highlighted){
            rgb.g = rgb.g + 70
        }
        return `rgb(${rgb.r},${rgb.g},${rgb.b})`
    }

    render() {

        const squares = this.state.board.map
        (d => <button type="button"
                      id={d.id}
                      style={{
                          width: "100px", height: "100px",
                          backgroundColor: this.getColor(d.id),
                          border: "none",
                          backgroundImage: `url("http://localhost:3000/${this.mapping(d.id)}.png")`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100%"
                        }}

                      onClick={e => this.handleClick(e.target.id)}>

            </button>
        )
        return <div>
            {squares}
            <p><b>{this.state.overMessage}</b></p>
        </div>
    }


}
