import type { Color } from "$lib/enums/color";

export type RoomState = {
    selfId?: string;
    enemyId?: string;
    roomId?: string;
    winner?: Color;
    error?: string;
    promotion: boolean;
    check: boolean;
}