
import type { Color } from './enums/color';
import { Board } from './types/board';
import type { MoveHistory } from './types/move';
import type { Piece } from './types/piece';


export { start, disconnect, roomStore } from './connection/client';

export function createBoard(pieces: Piece[][], color: Color, moves: MoveHistory[]): Board {
    const board = new Board();
    board.playerColor = color;
    board.pieces = pieces;
    board.moves = moves;
    board.turn = 1;
    return board;
}