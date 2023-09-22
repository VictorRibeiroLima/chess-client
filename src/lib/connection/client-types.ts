import type { Board } from "$lib/types/board";

export type RoomState = {
    board: Board;
    selfId: string;
    enemyId: string;
    roomId: string;
}