import type { Color } from "$lib/enums/color";
import type { PieceType } from "$lib/enums/piece-type";
import type { Piece } from "./piece";

export class Board {
    playerColor: Color;
    pieces: Piece[][];

    move(from: string, to: string) {
        const [fromX, fromY] = this.stringToLocation(from);
        const [toX, toY] = this.stringToLocation(to);


        const piece = this.pieces[fromY][fromX];
        this.pieces[fromY][fromX] = null;
        this.pieces[toY][toX] = piece;
    }

    promote(on: string, to: PieceType) {
        const [x, y] = this.stringToLocation(on);
        const piece = this.pieces[y][x];
        const toPiece: Piece = {
            color: piece.color,
            type: to
        };
        this.pieces[y][x] = toPiece;
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

