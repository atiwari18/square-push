export class MoveType {
    constructor(deltaR, deltaC, label) {
        this.deltaR = deltaR;
        this.deltaC = deltaC;
        this.label = label;
    }
}

export const Up = new MoveType(-1, 0, "up");
export const Down = new MoveType(1, 0, "down");
export const Left = new MoveType(0, -1, "left");
export const Right = new MoveType(0, 1, "down");

export class Location {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}

export class ninjaSE {
    constructor(row, column) {
        this.width = 200;
        this.height = 200;
        this.row = row;
        this.column = column;
    }

    place(row, column) {
        this.row = row;
        this.column = column;
    }

    location() {
        return new Location(this.row, this.column);
    }
}

export class Piece {
    constructor(color, row, column) {
        this.width = 100;
        this.height = 100;
        this.row = row;
        this.column = column;
        this.color = color;
    }

    place(row, column) {
        this.row = row;
        this.column = column;
    }
}

export class Board {
    constructor(rows, columns, pieces, ninjaSE) {
        this.rows = rows;
        this.columns = columns;
        this.width = this.rows * 100;
        this.height = this.columns * 100;
        this.pieces = pieces;
        this.ninjaSE = ninjaSE;
    }

    isBlockedIn(direction) {
        if (direction === Left) {

        }
            //Start loop one left of ninjaSE's start
        
    }

    availableNinjaMoves() {
        let moves = [];
        let coord = this.ninjaSE.location();

        //Can NinjaSE move left?
        let available = false;

    }
}

export default class Model {
    //INFO is a JSON encoded board.
    constructor(info) {
        this.initialize(info);
        this.info = info;
    }

    initialize(info) {
        let numRows = parseInt(info.numRows);
        let numColumns = parseInt(info.numColumns);
        let ninjaSEObj = new ninjaSE(parseInt(info.ninjaRow) - 1, (info.ninjaColumn.charCodeAt(0) - 'A'.charCodeAt(0)));

        //Create the pieces for the board
        var pieces = [];
        for (let p of info.initial) {
            const color = p.color;
            const numRows = parseInt(p.row) - 1;
            const numColumns = p.column.charCodeAt(0) - 'A'.charCodeAt(0);
            pieces.push(new Piece(color, numRows, numColumns));
        }

        this.board = new Board(numRows, numColumns, pieces, ninjaSEObj);
        this.numMoves = 0;
        this.score = 0;
    }

    available(direction) {
        let allMoves = this.board.availableNinjaMoves();

        return allMoves.includes(direction);
    }

}