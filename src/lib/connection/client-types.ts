import type { Color } from "$lib/enums/color";
import type { Board } from "$lib/types/board";

export type RoomState = {
    board: Board;
    selfId?: string;
    enemyId?: string;
    roomId?: string;
    winner?: Color;
    error?: string;
    promotion: boolean;
    check: boolean;
}