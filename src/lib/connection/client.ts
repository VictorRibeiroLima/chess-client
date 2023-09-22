import { createBoard } from '$lib';
import type { Board } from '$lib/types/board';
import type { RoomState } from './client-types';
import type { ConnectResult, ErrorMessage, Message, MovementResult, SuccessMessage } from './server-types';
import { get, readonly, writable } from 'svelte/store';

const roomState = writable({} as RoomState)
export const roomStore = readonly(roomState);

let socket: WebSocket;
let board: Board;


export function start() {
    board = createBoard();
    socket = new WebSocket('wss://chess-server-for39.ondigitalocean.app/ws/room/create');
    registerHandlers(socket);
}

export function join(roomId: string) {
    board = createBoard();
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

function registerHandlers(socket: WebSocket) {
    socket.addEventListener('open', function () {

    });

    socket.addEventListener('message', function (event: MessageEvent) {
        const message: Message = JSON.parse(event.data);
        handleMessage(message);
    });
}

function handleMessage(message: Message) {
    if (message.error) {
        handleError(message.error);
        return;
    }
    const state = get(roomState);
    handleSuccess(message.success, state);
    state.board = board;
    roomState.set(state);
}

function handleError(message: ErrorMessage) {
    console.log(`Error: ${message.error}`);
}

function handleSuccess(message: SuccessMessage, state: RoomState) {
    const result = message.result;
    if ((result as ConnectResult).connect) {
        handleConnectResult(result as ConnectResult, state);
    } else if ((result as MovementResult).movement) {
        handleMovementResult(result as MovementResult);
    }
}

function handleConnectResult(result: ConnectResult, state: RoomState) {
    if (!state.selfId) {
        console.log(`Connected as ${result.connect.clientId}`);
        console.log(`Color: ${result.connect.color}`);
        board.playerColor = result.connect.color;
        state.selfId = result.connect.clientId;
        state.roomId = result.connect.roomId;
    } else {
        console.log(`Enemy connected as ${result.connect.clientId}`);
        state.enemyId = result.connect.clientId;
    }
}

function handleMovementResult(result: MovementResult) {
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
}