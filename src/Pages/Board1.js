import React from 'react';
import './Board1.css';
import Model from '../Model/Model.js';
import {board1Information} from '../Model/Board1JSON.js';
import {config_5x5 } from '../Model/BoardConfigurations.js';
import {redrawBoard} from '../Boundary/Boundary.js';
import ninjase from '../ninjase.svg'
import {Up, Down, Left, Right} from '../Model/Model.js';
import {moveNinjaSE} from '../Controller/Controller.js';

var board1 = JSON.parse(JSON.stringify(config_5x5));

var keyPressed = false;

export const Board1 = () => {

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
        console.log(direction);
        console.log(model);
        console.log(model.board.ninjaSE);
        forceRedraw(redraw + 1);
    }

    function removeActiveClass(e) {
        // Removes activeKey for everything
        e.target.classList.remove("activeKey");
    }

  
    function keyDown(event) {
        // Assigns key "div" to key
        const key = document.querySelector(`div[data-key="${event.keyCode}"]`);

        // Only applies activeKey to the keys WASD
        if (
            event.keyCode === 87 ||
            event.keyCode === 65 ||
            event.keyCode === 83 ||
            event.keyCode === 68
        ) {
            // Adds class activeKey
            key.classList.add("activeKey");

            var direction = null;
            if ( (event.keyCode === 65) && model.available(Left) ) { direction = Left;  moveNinjaHandler(direction);}
            else if ( (event.keyCode === 87) && model.available(Up) ) { direction = Up;  moveNinjaHandler(direction); }
            else if ( (event.keyCode === 68) && model.available(Right) ) { direction = Right;  moveNinjaHandler(direction);}
            else if ( (event.keyCode === 83) && model.available(Down) ) { direction = Down;  moveNinjaHandler(direction);}
        }

        // Creates a const array of all the keys on screen
        const keys = Array.from(document.querySelectorAll(".key"));
        // Listens to the browser and removes activeKey when needed
        keys.forEach(key => key.addEventListener("transitionend", removeActiveClass));
    }


    // Listens to users and when key is pressed calls keyDown
    window.addEventListener("keydown", keyDown);

    const handleKeyUp = (e) => {
        keyPressed = false;
    }

    const handleKeyDown = (e) => {
        if (keyPressed) { return ; }
        keyDown = true;

        var direction = null;
        if ( (e.keyCode === 65) && model.available(Left) ) { direction = Left; }
        else if ( (e.keyCode === 87) && model.available(Up) ) { direction = Up; }
        else if ( (e.keyCode === 68) && model.available(Right) ) { direction = Right; }
        else if ( (e.keyCode === 83) && model.available(Down) ) { direction = Down; }

        //If there is a direction then we call the moveNinja Handler
        if (direction) {
            moveNinjaHandler(direction);
        }
    }
 

    return (
        <body>
            <div className = "canvas">
                <img id="ninjase" src={ninjase} alt="hidden" hidden></img>
                <canvas width="520px" height="520px" ref = {canvasRef} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}></canvas>

                <div className="keyboard">

                    <div className="keyboardTop">
                        <div data-key="87" className="key">
                        <p>W</p>
                        </div>
                    </div>
                    
                    <div class="keyboardBottom">
                        <div data-key="65" className="key">
                            <p>A</p>
                        </div>
                        <div data-key="83" className="key">
                            <p>S</p>
                        </div>
                        <div data-key="68" className="key">
                            <p>D</p>
                        </div>
                    </div>
                </div>
            </div>
           
            <div className="buttonLocations">
                <button className="resetButton">Reset</button>
                <button className = "removeButton">Remove</button>
            </div>
        </body>

    );
}

export default Board1;