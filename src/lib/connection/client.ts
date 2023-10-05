
import { createBoard } from '$lib';
import type { Board } from '$lib/types/board';
import type { Piece } from '$lib/types/piece';
import type { RoomState } from './client-types';
import type { ConnectResult, DisconnectResult, ErrorMessage, Message, MovementResult, PromotionResult, SuccessMessage, WinnerResult } from './server-types';
import { readonly, writable } from 'svelte/store';

type State = {
    roomState: RoomState;
    board: Board;
}

const state: State = {
    roomState: {} as RoomState,
    board: undefined
}
const roomState = writable({} as RoomState)
const boardState = writable(undefined);


export const roomStore = readonly(roomState);
export const boardStore = readonly(boardState);

let socket: WebSocket;


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
    roomState.set({} as RoomState);
    boardState.set(undefined);
    state.board = undefined;
    state.roomState = {} as RoomState;
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

    socket.addEventListener('message', function (event: MessageEvent) {
        const message: Message = JSON.parse(event.data);
        handleMessage(message);
    });
}

function handleMessage(message: Message) {
    if (message.error) {
        handleError(message.error);
    } else { handleSuccess(message.success); }
    roomState.set(state.roomState);
}

function handleError(message: ErrorMessage) {
    state.roomState.error = message.error;
    console.log(`Error: ${message.error}`);
}

function handleSuccess(message: SuccessMessage) {
    state.roomState.error = undefined;
    const result = message.result;
    const selfId = state.roomState.selfId;

    if ((result as ConnectResult).connect) {
        handleConnectResult(result as ConnectResult);
        return;
    }
    if (message.clientId !== selfId) {
        state.roomState.enemyId = message.clientId;
    }
    if ((result as MovementResult).movement) {
        handleMovementResult(result as MovementResult);
    } else if ((result as DisconnectResult).disconnect) {
        handleDisconnectResult(result as DisconnectResult);
    } else if ((result as PromotionResult).promotion) {
        handlePromotionResult(result as PromotionResult);
    } else if ((result as WinnerResult).winner) {
        handleWinnerResult(result as WinnerResult);
    }
}

function handleConnectResult(result: ConnectResult) {
    const connect = result.connect;
    if (connect.conType === 'selfClient') {
        state.roomState.selfId = connect.clientId;
        state.roomState.enemyId = connect.enemyId;
        state.roomState.roomId = connect.roomId;
        state.board = createBoard(connect.pieces, connect.color, connect.moves);
        boardState.set(state.board);
    } else {
        state.roomState.enemyId = connect.clientId;
    }
}

function handleDisconnectResult(result: DisconnectResult) {
    const selfId = state.roomState.selfId;
    if (selfId === result.disconnect.clientId) {
        console.log(`Disconnected from room ${result.disconnect.roomId}`);
    } else {
        state.roomState.enemyId = undefined;
        console.log(`Enemy disconnected from room ${result.disconnect.roomId}`);
    }
}

function handleMovementResult(result: MovementResult) {
    const movement = result.movement;
    state.board.move(movement);
    state.roomState.check = movement.check === state.board.playerColor;
    state.roomState.promotion = movement.promotion === state.board.playerColor;

    boardState.set(state.board);
}

function handlePromotionResult(result: PromotionResult) {

    const promotion = result.promotion;
    const on = promotion.position;
    const to = promotion.piece;

    state.board.promote(on, to);
    state.roomState.promotion = false;
    state.roomState.check = promotion.check === state.board.playerColor;
    boardState.set(state.board);
}

function handleWinnerResult(result: WinnerResult) {
    state.roomState.winner = result.winner;
    console.log(`Winner: ${result.winner}`);
}