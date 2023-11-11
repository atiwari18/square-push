export class MoveType {
    constructor(deltaR, deltaC) {
        this.deltaR = deltaR;
        this.deltaC = deltaC;
    }


}

export const Left = new MoveType(-1, 0);
export const Right = new MoveType(1, 0);
export const Up = new MoveType(0, -1);
export const Down = new MoveType(0, 1);

export const pieceLeft = new MoveType(0, -1);
export const pieceRight = new MoveType(0, 1);
export const pieceUp = new MoveType(-1, 0);
export const pieceDown = new MoveType(1, 0);

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
        this.column = row;
        this.row = column;
    }

    place(row, column) {
        this.row = row;
        this.column = column;
    }

    location() {
        return new Location(this.row, this.column);
    }

    move(direction) {
        this.row += direction.deltaR;
        this.column += direction.deltaC;
    }
}

export class Piece {
    constructor(color, row, column) {
        this.width = 100;
        this.height = 100;
        this.row = row;
        this.column = column;
        this.color = color;
        this.isConnectedToNinja = false;
    }

    isConnected(bool) {
        this.isConnectedToNinja = bool;
    }

    place(row, column) {
        this.row = row;
        this.column = column;
    }

    move(model, direction) {
        this.row += direction.deltaR;
        this.column += direction.deltaC;

        // Check if the piece goes out of bounds to the left
        if (this.column < 0) {
            this.column = model.board.columns - 1; // Wrap to the rightmost column
        }

        // Check if the piece goes out of bounds to the left
        if (this.column >= model.board.columns) {
            this.column = 0; // Wrap to the leftmost column
        }

        // Check if the piece goes out of bounds at the top
        if (this.row < 0) {
            this.row = model.board.rows - 1; // Wrap to the bottom row
        }

        // Check if the piece goes out of bounds at the bottom
        if (this.row >= model.board.rows) {
            this.row = 0; // Wrap to the top row
        }
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
        this.img = null;
    }

    availableNinjaMoves() {
        let moves = [];
        let coord = this.ninjaSE.location();

        //Can NinjaSE move left?
        let available = false;
        if(coord.row > 0) {
            available = true;
            if (available) {
                moves.push(Left);
            }
        }

        //Can NinjaSe move right?
        available = false;
        if((coord.row + 1) < (this.rows - 1)) {
            available = true;
            if (available) {
                moves.push(Right);
            }
        }

        //Can NinjaSE move down?
        available = false;
        if ((coord.column + 1) < (this.columns - 1)) {
            available = true;
            if (available) {
                moves.push(Down);
            }
        }

        //Can NinjaSE move up?
        available = false;
        if (coord.column > 0) {
            available = true;
            if(available) {
                moves.push(Up);
            }
        }

        return moves;
    }

    remove(colors) {
        //Remove the all the colors in this filtered array. 
        this.pieces = this.pieces.filter(piece => !colors.includes(piece.color));
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
            const row = parseInt(p.row) - 1;
            const col = p.column.charCodeAt(0) - 'A'.charCodeAt(0);
            pieces.push(new Piece(color, row, col));
        }

        this.board = new Board(numRows, numColumns, pieces, ninjaSEObj);
        this.numMoves = 0;
        this.score = 0;
    }

    available(direction) {
        let allMoves = this.board.availableNinjaMoves();
        return allMoves.includes(direction);
    }

    incrementScore(delta) {
        this.score += delta;
    }

    incrementMoves(delta) {
        this.numMoves += delta;
    }

    isVictorious() {
        return this.board.pieces.length === 0;
    }

}