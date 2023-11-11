

export function drawBoard(ctx, board) {
    let width = board.width;
    let height = board.height;
    let gridSize = height / board.rows;
    let p = 10;

    ctx.fillStyle = 'white';
    ctx.lineWidth = 4;

    for (let x = 0; x <= width; x += 100) {
        ctx.moveTo(0.5 + x + p, p);
        ctx.lineTo(0.5 + x + p, height + p);
    }

    for (let y = 0; y <= height; y += 100) {
        ctx.moveTo(p, 0.5 + y + p);
        ctx.lineTo(width + p, 0.5 + y + p);
    }
    ctx.strokeStyle = "black";
    ctx.stroke();

    //Draw the pieces onto the grid. 
    for (let piece of board.pieces) {
        ctx.fillStyle = piece.color;
        let pieceX = piece.column * gridSize + p + 2;
        let pieceY = piece.row * gridSize + p + 2;
        let pieceWidth = piece.width - 3.15;
        let pieceHeight = piece.height - 3.15;
        ctx.fillRect(pieceX, pieceY, pieceWidth, pieceHeight);
    }

    //Place NinjaSe onto the grid.
    let ninjaImg = document.getElementById('ninjase');
    let imageWidth = board.ninjaSE.width - 4;
    let imageHeight = board.ninjaSE.width - 4;
    let imageX = board.ninjaSE.row * gridSize + p + 2;
    let imageY = board.ninjaSE.column * gridSize + p + 2;
    ninjaImg.onload = () => {
        console.log(ninjaImg);
        console.log(board.ninjaSE.column, board.ninjaSE.row);
        ctx.drawImage(ninjaImg, imageX, imageY, imageWidth, imageHeight);
        return;
    };

    ctx.drawImage(ninjaImg, imageX, imageY, imageWidth, imageHeight);
}

export function redrawBoard(model, canvasObj, appObj) {
    const ctx = canvasObj.getContext('2d');

    //Clear the canvas
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);

    drawBoard(ctx, model.board, model.img);
}