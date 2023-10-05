import type { Color } from "$lib/enums/color";
import type { Piece } from "./piece";

type BasicMove = {
  check?: Color;
  promotion?: Color;
}

export type MoveHistory = {
  turnNumber: number;
  piece: Piece;
  movement?: Move;
  promotion?: Promotion;
}

export type Promotion = {
  on: string;
  to: Piece;
}

export type Move = MoveValid | MoveCapture | MoveCastling | MoveEnPassant | MoveInitialDoubleAdvance;

export type MoveValid = {
  valid: [string, string];
} & BasicMove;

export type MoveCapture = {
  capture: [string, string];
} & BasicMove;

export type MoveCastling = {
  castling: [[string, string], [string, string]];
} & BasicMove;

export type MoveEnPassant = {
  enPassant: [string, string];
} & BasicMove;

export type MoveInitialDoubleAdvance = {
  initialDoubleAdvance: [string, string];
} & BasicMove;


