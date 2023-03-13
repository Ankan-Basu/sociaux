import { Server } from "socket.io";
import { io } from "socket.io-client";

const SocketHandler = (req, res) => {
    if(res.socket.server.io) {
        console.log('Socket is already running');
    } else {
        console.log('Initialisng socket ...');
        const io = new Server(res.socket.server);
        res.socket.server.io = io;
        
        io.on('connection', socket => {
            console.log('Socket connected');

            socket.on('button-click', msg => {
                console.log('Button clicked');
                console.log(msg);
                socket.broadcast.emit('resp-click', msg);
            });
        });
    }
    res.end();

}

export default SocketHandler;