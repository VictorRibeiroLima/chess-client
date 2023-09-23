import type { Color } from "../enums/color";
import type { PieceType } from "../enums/piece-type";

export type Message = {
    success?: SuccessMessage;
    error?: ErrorMessage;
};

export type ErrorMessage = {
    clientId: string;
    roomId: string;
    error: string;
}

export type SuccessMessage = {
    clientId: string;
    roomId: string;
    result: Result;
}

export type Result = PromotionResult | WinnerResult | ConnectResult | DisconnectResult | MovementResult;

export type PromotionResult = {
    promotion: [string, PieceType]
}

export type WinnerResult = {
    winner: Color;
}

export type ConnectResult = {
    connect: {
        clientId: string;
        roomId: string;
        color: Color;
    }

}

export type DisconnectResult = {
    disconnect: {
        clientId: string;
        roomId: string;
    }
}

export type MovementResult = {
    movement: Move;
}

export type Move = MoveValid | MoveCapture | MoveCastling | MoveEnPassant | MoveInitialDoubleAdvance;

export type MoveValid = {
    valid: [string, string];
}

export type MoveCapture = {
    capture: [string, string];
}

export type MoveCastling = {
    castling: [[string, string], [string, string]];
}

export type MoveEnPassant = {
    enPassant: [string, string];
}

export type MoveInitialDoubleAdvance = {
    initialDoubleAdvance: [string, string];
}


