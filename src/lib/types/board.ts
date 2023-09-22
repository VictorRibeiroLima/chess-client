import type { Color } from "$lib/enums/color";
import type { Piece } from "./piece";

export type Board = {
    playerColor: Color;
    pieces: Piece[][];
};