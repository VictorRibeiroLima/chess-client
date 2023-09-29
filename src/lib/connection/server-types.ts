import type { Piece } from "$lib/types/piece";
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
    promotion: {
        piece: PieceType;
        position: string;
        check?: Color;
    }
}

export type WinnerResult = {
    winner: Color;
}

export type ConnectResult = {
    connect: {
        clientId: string;
        enemyId?: string;
        roomId: string;
        color: Color;
        pieces: Piece[][];
        conType: "selfClient" | "enemyClient"
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

type BasicMoveResult = {
    check?: Color;
    promotion?: Color;
}

export type Move = MoveValid | MoveCapture | MoveCastling | MoveEnPassant | MoveInitialDoubleAdvance;

export type MoveValid = {
    valid: [string, string];
} & BasicMoveResult;

export type MoveCapture = {
    capture: [string, string];
} & BasicMoveResult;

export type MoveCastling = {
    castling: [[string, string], [string, string]];
} & BasicMoveResult;

export type MoveEnPassant = {
    enPassant: [string, string];
} & BasicMoveResult;

export type MoveInitialDoubleAdvance = {
    initialDoubleAdvance: [string, string];
} & BasicMoveResult;


