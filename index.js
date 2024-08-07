const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket)=> {
    console.log('a user connected', socket.id);

    socket.on('from_client', () => {
        console.log('event comming from client');
    });

    setInterval(() => {
        socket.emit('from_server')
    }, 2000);
});// from backend start listnict to the io

// going to settup middleware for connection the static files with node(HTML is a ststic filr)
app.use('/', express.static(__dirname + '/public'));//this middle map that where is your static accests

server.listen(3000, () => {
    console.log("Server Started");
})