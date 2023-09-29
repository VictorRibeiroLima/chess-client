import type { Color } from './enums/color';
import { Board } from './types/board';
import type { Piece } from './types/piece';

// place files you want to import through the `$lib` alias in this folder.
export { start, disconnect, roomStore } from './connection/client';

export function createBoard(pieces: Piece[][], color: Color): Board {
    const board = new Board();
    board.playerColor = color;
    board.pieces = pieces;
    return board;
}