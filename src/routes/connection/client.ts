let  socket:WebSocket;

export function start(){
    console.log('start');
    socket = new WebSocket('ws://chess-server-for39.ondigitalocean.app/ws/room/create');
    socket.addEventListener('open', function (event) {
        console.log(event);
    });
    
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });

}