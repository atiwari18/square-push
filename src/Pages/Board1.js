import React from 'react';
import './Board1.css';
import Model from '../Model/Model.js';
import {config_5x5 } from '../Model/BoardConfigurations.js';
import {redrawBoard} from '../Boundary/Boundary.js';
import ninjase from '../ninja-se.svg'
import {Up, Down, Left, Right} from '../Model/Model.js';
import {moveNinjaSE} from '../Controller/Controller.js';
import { removeAll2by2} from '../Controller/Controller.js';
import {Navigate} from 'react-router-dom';

var board1 = JSON.parse(JSON.stringify(config_5x5));

export const Board1 = () => {

    const [model, setModel] = React.useState(new Model(board1));
    const[redraw, forceRedraw] = React.useState(0);

    const appRef = React.useRef(null);
    const canvasRef = React.useRef(null);

    //Ensures that initial rendering is performed, and whenever model is changed, it is rerendered.
    React.useEffect(() => {
        //Happens Once
        //redrawBoard(model, canvasRef.current, appRef.current);
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
        <main>
            {model.isVictorious() ? (<Navigate to="/victory"></Navigate>) : null }
                <div className = "canvas">
                    <img id="ninjase" src={ninjase} alt="hidden" hidden></img>
                    <canvas width="520px" height="520px" ref = {canvasRef}></canvas>

                    <button className = "upButton" onClick = {(e) => moveNinjaHandler(Up)} disabled={!model.available(Up)}> &#8593; </button>
                    <button className = "leftButton" onClick = {(e) => moveNinjaHandler(Left)} disabled={!model.available(Left)}> &#8592; </button>
                    <button className = "rightButton" onClick = {(e) => moveNinjaHandler(Right)} disabled={!model.available(Right)}> &#8594; </button>
                    <button className = "downButton"onClick = {(e) => moveNinjaHandler(Down)} disabled={!model.available(Down)}> &#8595; </button>

                    <p className = "scoreLabel"> {"Score: " + model.score}</p>
                    <label className = "moveLabel"> {"Num Moves: " + model.numMoves}</label>

                </div>
            
                <div className="buttonLocations">
                    <button className="resetButton" onClick = {(e) => resetHandler()}>Reset</button>
                    <button className = "removeButton" onClick = {(e) => removeHandler()}>Remove</button>
                </div>
        </main>

    );
}

export default Board1;