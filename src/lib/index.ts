import { Color } from './enums/color';
import { PieceType } from './enums/piece-type';
import type { Board } from './types/board';

// place files you want to import through the `$lib` alias in this folder.
export { start, disconnect, roomStore } from './connection/client';

export function createBoard(): Board {
    const board: Board = {
        playerColor: Color.White,
        pieces: [
            [
                { color: Color.White, type: PieceType.Rook },
                { color: Color.White, type: PieceType.Knight },
                { color: Color.White, type: PieceType.Bishop },
                { color: Color.White, type: PieceType.Queen },
                { color: Color.White, type: PieceType.King },
                { color: Color.White, type: PieceType.Bishop },
                { color: Color.White, type: PieceType.Knight },
                { color: Color.White, type: PieceType.Rook },
            ],
            [
                { color: Color.White, type: PieceType.Pawn },
                { color: Color.White, type: PieceType.Pawn },
                { color: Color.White, type: PieceType.Pawn },
                { color: Color.White, type: PieceType.Pawn },
                { color: Color.White, type: PieceType.Pawn },
                { color: Color.White, type: PieceType.Pawn },
                { color: Color.White, type: PieceType.Pawn },
                { color: Color.White, type: PieceType.Pawn },
            ],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [
                { color: Color.Black, type: PieceType.Pawn },
                { color: Color.Black, type: PieceType.Pawn },
                { color: Color.Black, type: PieceType.Pawn },
                { color: Color.Black, type: PieceType.Pawn },
                { color: Color.Black, type: PieceType.Pawn },
                { color: Color.Black, type: PieceType.Pawn },
                { color: Color.Black, type: PieceType.Pawn },
                { color: Color.Black, type: PieceType.Pawn },
            ],
            [
                { color: Color.Black, type: PieceType.Rook },
                { color: Color.Black, type: PieceType.Knight },
                { color: Color.Black, type: PieceType.Bishop },
                { color: Color.Black, type: PieceType.Queen },
                { color: Color.Black, type: PieceType.King },
                { color: Color.Black, type: PieceType.Bishop },
                { color: Color.Black, type: PieceType.Knight },
                { color: Color.Black, type: PieceType.Rook },
            ],
        ],
    }

    return board;
}