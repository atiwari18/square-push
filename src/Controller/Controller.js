import {pieceLeft, pieceRight, pieceUp, pieceDown} from '../Model/Model.js';
import {Left, Right, Up, Down} from '../Model/Model.js';

//Function responsible for moving Ninja-SE
export function moveNinjaSE(model, direction) {
    let ninja = model.board.ninjaSE;

    //If the direction is left this is the logic for moving the pieces.
    if (direction === Left) {
        //Filter to check for all pieces left of Ninja-SE
        var filtered = model.board.pieces.filter( function(piece) {
            if ( (piece.row === ninja.column) || (piece.row === (ninja.column + 1))) {

                return piece;
            }
        });

        //Left
        let startingRow = (ninja.row - 1);
        let lastRow = [ninja.column, (ninja.column + 1)];
        for (let c = startingRow; ; c = (c - 1 + model.board.rows) % model.board.rows) {
            let colRow = [];
            for(let p of filtered) {
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


        filtered.forEach((piece) => {
            if (piece.isConnectedToNinja) {
                piece.move(model, pieceLeft);
            }
        });
    }

    if (direction === Right) {
        //Filter to check for all pieces right of Ninja-SE
        var filtered = model.board.pieces.filter( function(piece) {
            if ( (piece.row === ninja.column) || (piece.row === (ninja.column + 1))) {

                return piece;
            }
        });

        //Right
        let startingRow = (ninja.row + 2);
        let lastRow = [ninja.column, (ninja.column + 1)];
        for (let c = startingRow; ; c = (c + 1 + model.board.rows) % model.board.rows) {
            let colRow = [];
            for(let p of filtered) {
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


        filtered.forEach((piece) => {
            if (piece.isConnectedToNinja) {
                piece.move(model, pieceRight);
            }
        });
    }

    if (direction === Up) {
        //Filter to check for all pieces above of Ninja-SE
        var filtered = model.board.pieces.filter( function(piece) {
            if ( (piece.column === ninja.row) || (piece.column === (ninja.row + 1))) {

                return piece;
            }
        });

        //Up
        let startingCol = (ninja.column - 1);
        let lastCol = [ninja.row, (ninja.row + 1)];
        for (let c = startingCol; ; c = (c - 1 + model.board.columns) % model.board.columns) {
            let rowCol = [];
            for(let p of filtered) {
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


        filtered.forEach((piece) => {
            if (piece.isConnectedToNinja) {
                piece.move(model, pieceUp);
            }
        });
    }

    if (direction === Down) {
        //Filter to check for all pieces above of Ninja-SE
        var filtered = model.board.pieces.filter( function(piece) {
            if ( (piece.column === ninja.row) || (piece.column === (ninja.row + 1))) {

                return piece;
            }
        });

        //Down
        let startingCol = (ninja.column + 2);
        let lastCol = [ninja.row, (ninja.row + 1)];
        for (let c = startingCol; ; c = (c + 1 + model.board.columns) % model.board.columns) {
            let rowCol = [];
            for(let p of filtered) {
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


        filtered.forEach((piece) => {
            if (piece.isConnectedToNinja) {
                piece.move(model, pieceDown);
            }
        });
    }

    ninja.move(direction);
}