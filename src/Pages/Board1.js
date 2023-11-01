import React from 'react';
import './Board1.css';
import Model from '../Model/Model.js';
import {board1Information} from '../Model/Board1JSON.js';
import {redrawBoard} from '../Boundary/Boundary.js';
import ninjase from '../ninjase.svg'
import {Up, Down, Left, Right} from '../Model/Model.js';

var board1 = JSON.parse(JSON.stringify(board1Information));

export const Board1 = () => {

    const [model, setModel] = React.useState(new Model(board1));
    const[redraw, forceRedraw] = React.useState(0);

    const appRef = React.useRef(null);
    const canvasRef = React.useRef(null);

    function removeActiveClass(e) {
        // Removes activeKey for everything
        e.target.classList.remove("activeKey");
    }

    
    function handleKeyDown(event) {
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
        }

        // Creates a const array of all the keys on screen
        const keys = Array.from(document.querySelectorAll(".key"));
        // Listens to the browser and removes activeKey when needed
        keys.forEach(key => key.addEventListener("transitionend", removeActiveClass));

    }
    
    // Listens to users and when key is pressed calls keyPressed
    window.addEventListener("keydown", handleKeyDown);

    //Ensures that initial rendering is performed, and whenever model is changed, it is rerendered.
    React.useEffect(() => {
        //Happens Once
        redrawBoard(model, canvasRef.current, appRef.current);
    }, [model, redraw]) //This argument declares when to refresh (whenever model is updated)
    
    return (
        <div className = "canvas">
            <img id="ninjase" src={ninjase} alt="hidden" hidden></img>
            <canvas width="520px" height="520px" ref = {canvasRef}></canvas>

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


    );
}

export default Board1;