import React from 'react';
import './Board3.css';
import Model from '../Model/Model.js';
import {config_6x6 } from '../Model/BoardConfigurations.js';
import {redrawBoard} from '../Boundary/Boundary.js';
import ninjase from '../ninjase.svg'
import {Up, Down, Left, Right} from '../Model/Model.js';
import {moveNinjaSE} from '../Controller/Controller.js';
import { removeAll2by2} from '../Controller/Controller.js';
import {Navigate} from 'react-router-dom';

var board1 = JSON.parse(JSON.stringify(config_6x6));

export const Board3 = () => {
    const [model, setModel] = React.useState(new Model(board1));
    const[redraw, forceRedraw] = React.useState(0);

    const appRef = React.useRef(null);
    const canvasRef = React.useRef(null);

    //Ensures that initial rendering is performed, and whenever model is changed, it is rerendered.
    React.useEffect(() => {
        //Happens Once
        redrawBoard(model, canvasRef.current, appRef.current);
    }, [model, redraw]) //This argument declares when to refresh (whenever model is updated)

    const moveNinjaHandler = (direction) => {
        moveNinjaSE(model, direction);
        console.log('Row'+ model.board.ninjaSE.row);
        console.log('Column'+ model.board.ninjaSE.column);
        console.log(model.board.pieces);
        forceRedraw(redraw + 1);
        model.board.pieces.forEach((piece) => {
            piece.isConnected(false);
        } )
    }

    const resetHandler = () => {
        let m = new Model(board1);
        setModel(m);
    }

    const removeHandler = () => {
        removeAll2by2(model);
        console.log(model.board.pieces);
        forceRedraw(redraw + 1);
    }

    return (
        <main  onLoad={(e) => resetHandler()}>
            {model.isVictorious() ? (<Navigate to="/victory"></Navigate>) : null }
                <div className = "canvasB">
                    <img id="ninjase" src={ninjase} alt="hidden" hidden></img>
                    <canvas width="620px" height="620px" ref = {canvasRef}></canvas>

                    <button className = "upButtonB" onClick = {(e) => moveNinjaHandler(Up)} disabled={!model.available(Up)}> &#8593; </button>
                    <button className = "leftButtonB" onClick = {(e) => moveNinjaHandler(Left)} disabled={!model.available(Left)}> &#8592; </button>
                    <button className = "rightButtonB" onClick = {(e) => moveNinjaHandler(Right)} disabled={!model.available(Right)}> &#8594; </button>
                    <button className = "downButtonB"onClick = {(e) => moveNinjaHandler(Down)} disabled={!model.available(Down)}> &#8595; </button>

                    <p className = "scoreLabelB"> {"Score: " + model.score}</p>
                    <label className = "moveLabelB"> {"Num Moves: " + model.numMoves}</label>

                </div>
                <div className="buttonLocationsB">
                    <button className="resetButtonB" onClick = {(e) => resetHandler()}>Reset</button>
                    <button className = "removeButtonB" onClick = {(e) => removeHandler()}>Remove</button>
                </div>
        </main>
    );
}

export default Board3;