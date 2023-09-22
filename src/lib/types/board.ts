import type { Color } from "$lib/enums/color";
import type { Piece } from "./piece";

export class Board {
    playerColor: Color;
    pieces: Piece[][];

    move(from: string, to: string) {
        const [fromCol, fromRow] = from.split("");
        const [toCol, toRow] = to.split("");

        console.log(`Moving from ${fromCol}, ${fromRow} to ${toCol}, ${toRow}`);

        //a=97 so we can get the index of the column
        const fromX = fromCol.charCodeAt(0) - 97;

        //subtract 1 from the row to get the index of the row
        const fromY = parseInt(fromRow) - 1;

        const toX = toCol.charCodeAt(0) - 97;
        const toY = parseInt(toRow) - 1;



        const piece = this.pieces[fromY][fromX];
        this.pieces[fromY][fromX] = null;
        this.pieces[toY][toX] = piece;
    }
};

