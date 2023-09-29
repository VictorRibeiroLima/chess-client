
import { createBoard } from '$lib';
import type { Board } from '$lib/types/board';
import type { Piece } from '$lib/types/piece';
import type { RoomState } from './client-types';
import type { ConnectResult, DisconnectResult, ErrorMessage, Message, MovementResult, PromotionResult, SuccessMessage, WinnerResult } from './server-types';
import { get, readonly, writable } from 'svelte/store';

const roomState = writable({} as RoomState)
export const roomStore = readonly(roomState);

let socket: WebSocket;
let board: Board;


export function start() {
    socket = new WebSocket('wss://chess-server-for39.ondigitalocean.app/ws/room/create');
    registerHandlers(socket);
}

export function join(roomId: string) {
    socket = new WebSocket(`wss://chess-server-for39.ondigitalocean.app/ws/room/${roomId}`);
    registerHandlers(socket);
}

export function disconnect() {
    socket.close();
}

export function move(from: string, to: string) {
    const message = {
        move: {
            from: from,
            to: to,
        }
    }
    socket.send(JSON.stringify(message));
}

export function promote(to: Piece) {
    const message = {
        promote: {
            piece: to.type
        }
    }

    socket.send(JSON.stringify(message));
}

function registerHandlers(socket: WebSocket) {
    socket.addEventListener('open', function (event: MessageEvent) {
        console.log(event);
    });

    socket.addEventListener('message', function (event: MessageEvent) {
        console.log(event);
        const message: Message = JSON.parse(event.data);
        handleMessage(message);
    });
}

function handleMessage(message: Message) {
    const state = get(roomState);
    if (message.error) {
        handleError(message.error, state);
    } else { handleSuccess(message.success, state); }

    state.board = board;
    roomState.set(state);
}

function handleError(message: ErrorMessage, state: RoomState) {
    state.error = message.error;
    console.log(`Error: ${message.error}`);
}

function handleSuccess(message: SuccessMessage, state: RoomState) {
    state.error = undefined;
    const result = message.result;

    if ((result as ConnectResult).connect) {
        handleConnectResult(result as ConnectResult, state);
        return;
    }
    if (message.clientId !== state.selfId) {
        state.enemyId = message.clientId;
    }
    if ((result as MovementResult).movement) {
        handleMovementResult(result as MovementResult, state);
    } else if ((result as DisconnectResult).disconnect) {
        handleDisconnectResult(result as DisconnectResult, state);
    } else if ((result as PromotionResult).promotion) {
        handlePromotionResult(result as PromotionResult, state);
    } else if ((result as WinnerResult).winner) {
        handleWinnerResult(result as WinnerResult, state);
    }
}

function handleConnectResult(result: ConnectResult, state: RoomState) {
    const connect = result.connect;
    if (connect.conType === 'selfClient') {
        state.selfId = connect.clientId;
        state.enemyId = connect.enemyId;
        state.roomId = connect.roomId;
        board = createBoard(connect.pieces, connect.color);
    } else {
        state.enemyId = connect.clientId;
    }
}

function handleDisconnectResult(result: DisconnectResult, state: RoomState) {
    if (state.selfId === result.disconnect.clientId) {
        console.log(`Disconnected from room ${result.disconnect.roomId}`);
    } else {
        state.enemyId = undefined;
        console.log(`Enemy disconnected from room ${result.disconnect.roomId}`);
    }
}

function handleMovementResult(result: MovementResult, state: RoomState) {
    console.log(`Move: ${JSON.stringify(result.movement)}`);
    const movement = result.movement;
    const type = Object.keys(movement)[0];
    const move = movement[type];

    if (type !== 'castling') {
        const from = move[0];
        const to = move[1];

        board.move(from, to);
    } else {
        const kingMove = move[0];
        const rookMove = move[1];

        board.move(kingMove[0], kingMove[1]);
        board.move(rookMove[0], rookMove[1]);
    }
    state.check = movement.check === board.playerColor;
    state.promotion = movement.promotion === board.playerColor;
}

function handlePromotionResult(result: PromotionResult, state: RoomState) {

    console.log(`Promotion: ${JSON.stringify(result.promotion)}`);

    const promotion = result.promotion;
    const on = promotion.position;
    const to = promotion.piece;

    board.promote(on, to);
    state.promotion = false;
    state.check = promotion.check === board.playerColor;
}

function handleWinnerResult(result: WinnerResult, state: RoomState) {
    state.winner = result.winner;
    console.log(`Winner: ${result.winner}`);
}