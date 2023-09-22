import type { ConnectResult, ErrorMessage, Message, SuccessMessage } from './server-types';
import { get, readonly, writable } from 'svelte/store';

const _roomId = writable('')
export const roomStore = readonly(_roomId);

const _selfId = writable('')
export const idStore = readonly(_selfId);

const _enemyId = writable('')
export const enemyIdStore = readonly(_enemyId);

let socket: WebSocket;

export function start() {
    socket = new WebSocket('ws://chess-server-for39.ondigitalocean.app/ws/room/create');
    socket.addEventListener('open', function () {

    });

    socket.addEventListener('message', function (event: MessageEvent) {
        const message: Message = JSON.parse(event.data);
        handleMessage(message);
    });
}

export function disconnect() {
    socket.close();
}

function handleMessage(message: Message) {
    if (message.error) {
        handleError(message.error);
        return;
    }
    handleSuccess(message.success);

}

function handleError(message: ErrorMessage) {
    console.log(`Error: ${message.error}`);
}

function handleSuccess(message: SuccessMessage) {
    const result = message.result;
    if ((result as ConnectResult).connect) {
        handleConnectResult(result as ConnectResult);
    }
}

function handleConnectResult(result: ConnectResult) {
    if (get(_selfId) === '') {
        console.log(`Connected as ${result.connect.clientId}`);
        _selfId.set(result.connect.clientId);
        _roomId.set(result.connect.roomId);
    } else {
        console.log(`Enemy connected as ${result.connect.clientId}`);
        _enemyId.set(result.connect.clientId);
    }
}