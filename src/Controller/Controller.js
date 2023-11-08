import {pieceLeft, pieceRight, pieceUp, pieceDown} from '../Model/Model.js';
import {Left, Right, Up, Down} from '../Model/Model.js';

//Function responsible for detecting and removing all 2x2 groups
export function removeAll2by2(model) {

    let colors = [];
    for(let x of model.board.pieces) {
        let tempColors = [];
        let colorsConsidered=[];
        tempColors.push(x.color);
        for(let y of model.board.pieces) {
            if (colorsConsidered.includes(y.color)) {
                continue;
            }
            
            if (tempColors.includes(y.color)) {
                //Check if the piece is to the right. 
                if ( (y.column === (x.column + 1)) && (y.row === x.row)) {
                    tempColors.push(y.color);
                }

                //Check if the piece is under the top left.
                if ((y.row === (x.row + 1)) && (y.column === x.column)) {
                    tempColors.push(y.color);
                }

                //Check if the piece is the bottom right corner. 
                if ((y.row === (x.row + 1)) && (y.column === (x.column + 1))) {
                    tempColors.push(y.color);
                }
            }
        }

        if (tempColors.length !== 4) {
            colorsConsidered.push(x.color);
            continue;
        } else {
            colors.push(x.color);
        }
    }

    //Remove the all the colors in this filtered array. 
    model.board.remove(colors);

    //Increment score by respective multiple of 4.
    model.incrementScore(colors.length * 4);
}


//Function responsible for moving Ninja-SE
export function moveNinjaSE(model, direction) {
    let ninja = model.board.ninjaSE;

    //If the direction is left this is the logic for moving the pieces.
    if (direction === Left) {
        //Filter to check for all pieces left of Ninja-SE
        let filteredL = model.board.pieces.filter( function(piece) {
            if ( (piece.row === ninja.column) || (piece.row === (ninja.column + 1))) {

                return true;
            }

            return false;
        });

        //Left
        let startingRow = (ninja.row - 1);
        let lastRow = [ninja.column, (ninja.column + 1)];
        for (let c = startingRow; ; c = (c - 1 + model.board.rows) % model.board.rows) {
            let colRow = [];
            for(let p of filteredL) {
                if(p.column === c) {
                    if (lastRow.includes(p.row)) {
                        colRow.push(p.row);
                        p.isConnected(true);
                    } 
                }
            }

            if (colRow.length === 0) {
                break;
            } else {
                lastRow = colRow;
            }
        }


        filteredL.forEach((piece) => {
            if (piece.isConnectedToNinja) {
                piece.move(model, pieceLeft);
                model.incrementScore(+1);
            }
        });
    }

    if (direction === Right) {
        //Filter to check for all pieces right of Ninja-SE
        let filteredR = model.board.pieces.filter( function(piece) {
            if ( (piece.row === ninja.column) || (piece.row === (ninja.column + 1))) {

                return true;
            }

            return false;
        });

        //Right
        let startingRow = (ninja.row + 2);
        let lastRow = [ninja.column, (ninja.column + 1)];
        for (let c = startingRow; ; c = (c + 1 + model.board.rows) % model.board.rows) {
            let colRow = [];
            for(let p of filteredR) {
                if(p.column === c) {
                    if (lastRow.includes(p.row)) {
                        colRow.push(p.row);
                        p.isConnected(true);
                    } 
                }
            }

            if (colRow.length === 0) {
                break;
            } else {
                lastRow = colRow;
            }
        }


        filteredR.forEach((piece) => {
            if (piece.isConnectedToNinja) {
                piece.move(model, pieceRight);
                model.incrementScore(+1);
            }
        });
    }

    if (direction === Up) {
        //Filter to check for all pieces above of Ninja-SE
        let filteredU = model.board.pieces.filter( function(piece) {
            if ( (piece.column === ninja.row) || (piece.column === (ninja.row + 1))) {

                return true;
            }

            return false;
        });

        //Up
        let startingCol = (ninja.column - 1);
        let lastCol = [ninja.row, (ninja.row + 1)];
        for (let c = startingCol; ; c = (c - 1 + model.board.columns) % model.board.columns) {
            let rowCol = [];
            for(let p of filteredU) {
                if(p.row === c) {
                    if (lastCol.includes(p.column)) {
                        rowCol.push(p.column);
                        p.isConnected(true);
                    } 
                }
            }

            if (rowCol.length === 0) {
                break;
            } else {
                lastCol = rowCol;
            }
        }


        filteredU.forEach((piece) => {
            if (piece.isConnectedToNinja) {
                piece.move(model, pieceUp);
                model.incrementScore(+1);
            }
        });
    }

    if (direction === Down) {
        //Filter to check for all pieces above of Ninja-SE
        let filteredD = model.board.pieces.filter( function(piece) {
            if ( (piece.column === ninja.row) || (piece.column === (ninja.row + 1))) {

                return true;
            }

            return false;
        });

        //Down
        let startingCol = (ninja.column + 2);
        let lastCol = [ninja.row, (ninja.row + 1)];
        for (let c = startingCol; ; c = (c + 1 + model.board.columns) % model.board.columns) {
            let rowCol = [];
            for(let p of filteredD) {
                if(p.row === c) {
                    if (lastCol.includes(p.column)) {
                        rowCol.push(p.column);
                        p.isConnected(true);
                    } 
                }
            }

            if (rowCol.length === 0) {
                break;
            } else {
                lastCol = rowCol;
            }
        }


        filteredD.forEach((piece) => {
            if (piece.isConnectedToNinja) {
                piece.move(model, pieceDown);
                model.incrementScore(+1);
            }
        });
    }

    model.incrementMoves(+1);
    ninja.move(direction);
}