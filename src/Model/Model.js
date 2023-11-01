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
    constructor(row, column, label) {
        this.width = 200;
        this.height = 200;
        this.row = row;
        this.column = column;
        this.label = label;
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
    constructor(color, label) {
        this.width = 100;
        this.height = 100;
        this.row = 0;
        this.column = 0;
        this.color = color;
        this.label = label;
    }

    place(row, column) {
        this.row = row;
        this.column = column;
    }
}

export class Board {
    constructor(rows, columns, width, height, pieces, ninjaSE) {
        this.rows = rows;
        this.columns = columns;
        this.width = width;
        this.height = height;
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
        let numRows = parseInt(info.board.rows);
        let numColumns = parseInt(info.board.columns);
        let width = parseInt(info.board.width);
        let height = parseInt(info.board.height);
        let ninjaSEObj = new ninjaSE(info.ninjaSE.row, info.ninjaSE.column, info.ninjaSE.label);

        //Create the pieces for the board
        var pieces = [];
        for (let p of info.pieces) {
            const color = p.color || 'white';
            pieces.push(new Piece(color, p.label));
        }

        //ID which pieces are shich and where they belong.
        for (let loc of info.locations) {
            let location = new Location(parseInt(loc.location.row), parseInt(loc.location.column));

            let i = pieces.findIndex(piece => (piece.label === loc.piece));
            pieces[i].place(location.row, location.column);
        }

        this.board = new Board(numRows, numColumns, width, height, pieces, ninjaSEObj);
        this.numMoves = 0;
        this.score = 0;
    }

    available(direction) {
        let allMoves = this.board.availableNinjaMoves();

        return allMoves.includes(direction);
    }

}