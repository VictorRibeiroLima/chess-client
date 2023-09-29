import type { Piece } from "./piece";

export type Move = MovementMove | PromotionMove;

export type MovementMove = {
    type: "movement";
    turn: number;
    piece: Piece;
    from: string;
    to: string;
}

export type PromotionMove = {
    type: "promotion";
    turn: number;
    piece: Piece;
    on: string;
    promotion: Piece;
}