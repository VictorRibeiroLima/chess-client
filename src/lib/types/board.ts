
import { Color } from "$lib/enums/color";
import type { PieceType } from "$lib/enums/piece-type";
import type { Move, MoveHistory, Promotion } from "./move";
import type { Piece } from "./piece";

export class Board {
    playerColor: Color;
    pieces: Piece[][];
    moves: MoveHistory[];
    turn: number;

    constructor(pieces: Piece[][], color: Color, moves: MoveHistory[]) {
        this.playerColor = color;
        this.pieces = pieces;
        this.moves = moves;
        if (moves.length > 0) {
            const lastMove = moves[moves.length - 1];
            if (lastMove.piece.color === Color.Black) {
                this.turn = lastMove.turnNumber + 1;
            } else {
                this.turn = lastMove.turnNumber;
            }
        } else {
            this.turn = 1;
        }

    }


    get lastMove(): MoveHistory {
        if (this.moves.length === 0) {
            return null;
        }
        return this.moves[this.moves.length - 1];
    }

    move(movement: Move) {
        const type = Object.keys(movement)[0];
        const moveT = movement[type];
        const turn = this.turn;

        let piece: Piece;

        if (type === 'enPassant') {
            const from = moveT[0];
            const to = moveT[1];
            piece = this.enPassant(from, to);
        }
        else if (type !== 'castling') {
            const from = moveT[0];
            const to = moveT[1];

            piece = this.normalMove(from, to);
        } else {
            const kingMove = moveT[0];
            const rookMove = moveT[1];

            piece = this.castling(kingMove, rookMove);
        }

        const history: MoveHistory = {
            piece,
            turnNumber: turn,
            movement: movement,
        }

        if (piece.color === Color.Black) {
            this.turn++;
        }

        this.moves.push(history);
    }




    promote(on: string, to: PieceType) {
        const [x, y] = this.stringToLocation(on);
        const piece = this.pieces[y][x];
        const toPiece: Piece = {
            color: piece.color,
            type: to
        };
        let turn: number;
        if (piece.color === Color.Black) {
            turn = this.turn - 1;
        }
        else {
            turn = this.turn;
        }


        this.pieces[y][x] = toPiece;

        const promotion: Promotion = {
            on: on,
            to: toPiece
        };

        const move: MoveHistory = {
            piece: piece,
            promotion: promotion,
            turnNumber: turn,
        };

        this.moves.push(move);
    }

    private castling(kingMove: [string, string], rookMove: [string, string]): Piece {
        const [kingFromX, kingFromY] = this.stringToLocation(kingMove[0]);
        const [kingToX, kingToY] = this.stringToLocation(kingMove[1]);

        const [rookFromX, rookFromY] = this.stringToLocation(rookMove[0]);
        const [rookToX, rookToY] = this.stringToLocation(rookMove[1]);

        const king = this.pieces[kingFromY][kingFromX];
        this.pieces[kingFromY][kingFromX] = null;
        this.pieces[kingToY][kingToX] = king;

        const rook = this.pieces[rookFromY][rookFromX];
        this.pieces[rookFromY][rookFromX] = null;
        this.pieces[rookToY][rookToX] = rook;

        return king;

    }

    private enPassant(from: string, to: string): Piece {

        const [fromX, fromY] = this.stringToLocation(from);
        const [toX, toY] = this.stringToLocation(to);

        const piece = this.pieces[fromY][fromX];
        this.pieces[fromY][fromX] = null;
        this.pieces[toY][toX] = piece;
        this.pieces[fromY][toX] = null;

        return piece;
    }

    private normalMove(from: string, to: string): Piece {
        const [fromX, fromY] = this.stringToLocation(from);
        const [toX, toY] = this.stringToLocation(to);

        const piece = this.pieces[fromY][fromX];
        this.pieces[fromY][fromX] = null;
        this.pieces[toY][toX] = piece;

        return piece;
    }


    private stringToLocation(location: string): number[] {
        const [fromCol, fromRow] = location.split("");
        //a=97 so we can get the index of the column
        const fromX = fromCol.charCodeAt(0) - 97;

        //subtract 1 from the row to get the index of the row
        const fromY = parseInt(fromRow) - 1;

        return [fromX, fromY];
    }
};

