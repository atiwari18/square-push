//Function responsible for moving Ninja-SE
export function moveNinjaSE(model, direction) {
    let ninja = model.board.ninjaSE;
    ninja.move(direction);
}