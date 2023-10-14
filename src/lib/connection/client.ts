
import { Board } from '$lib/types/board';
import type { Piece } from '$lib/types/piece';
import type { RoomState } from './client-types';
import type { ConnectResult, DisconnectResult, ErrorMessage, Message, MovementResult, PromotionResult, SuccessMessage, TimerMessage, WinnerResult } from './server-types';
import { readonly, writable } from 'svelte/store';

type State = {
    roomState: RoomState;
    board: Board;
}

let intervalId: NodeJS.Timeout;

const state: State = {
    roomState: {} as RoomState,
    board: undefined
}
const roomState = writable({} as RoomState)
const boardState = writable(undefined);
const enemyTimer = writable(0);
const selfTimer = writable(0);

export const roomStore = readonly(roomState);
export const boardStore = readonly(boardState);
export const enemyTimerStore = readonly(enemyTimer);
export const selfTimerStore = readonly(selfTimer);


let socket: WebSocket;


export function start() {
    const url = 'wss://chess-server-for39.ondigitalocean.app/ws/room/create';
    startSocket(url);
}

export function join(roomId: string) {
    const url = `wss://chess-server-for39.ondigitalocean.app/ws/room/${roomId}`;
    startSocket(url);
}




export function disconnect() {
    socket.close(1000);
    socket = undefined;
    roomState.set({} as RoomState);
    boardState.set(undefined);
    state.board = undefined;
    state.roomState = {} as RoomState;
    enemyTimer.set(0);
    selfTimer.set(0);
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

function startSocket(url: string) {
    socket = new WebSocket(url);

    socket.onopen = () => {
        clearInterval(intervalId);
        socket.addEventListener('message', function (event: MessageEvent) {
            const message: Message = JSON.parse(event.data);
            handleMessage(message);
        });

        const retryInterval = 1000;
        socket.addEventListener('close', function (event: CloseEvent) {
            console.log(`Socket closed with code ${event.code}`);
            if (event.code !== 1000) {
                const url = `wss://chess-server-for39.ondigitalocean.app/ws/room/${state.roomState.roomId}`;
                intervalId = setInterval(() => {
                    startSocket(url);
                }, retryInterval);
            }
        });

    }
}


function handleMessage(message: Message) {
    if (message.error) {
        handleError(message.error);
    } else if (message.success) {
        handleSuccess(message.success);
    }
    else if (message.timer) {
        handleTimerMessage(message.timer);
        return; //TODO: bad implementation,i need to return early so we don't trigger the roomState.set
    }

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

function handleTimerMessage(message: TimerMessage) {
    const timer = message.time;
    const enemyId = state.roomState.enemyId;
    if (enemyId === message.clientId) {
        enemyTimer.set(timer);
    } else {
        selfTimer.set(timer);
    }
}

function handleConnectResult(result: ConnectResult) {
    const connect = result.connect;
    if (connect.conType === 'selfClient') {
        state.roomState.selfId = connect.clientId;
        state.roomState.enemyId = connect.enemyId;
        state.roomState.roomId = connect.roomId;
        state.board = new Board(connect.pieces, connect.color, connect.moves);
        if (connect.color === 'white') {
            enemyTimer.set(connect.blackTimer);
            selfTimer.set(connect.whiteTimer);
        } else {
            enemyTimer.set(connect.whiteTimer);
            selfTimer.set(connect.blackTimer);
        }
        boardState.set(state.board);
    } else {
        state.roomState.enemyId = connect.enemyId;
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