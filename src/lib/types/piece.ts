import type { Color } from "$lib/enums/color";
import type { PieceType } from "$lib/enums/piece-type";

export type Piece = {
    color: Color;
    type: PieceType;
}