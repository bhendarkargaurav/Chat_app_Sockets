// server end

const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const connect = require('./config/database-config');

const Chat = require('./models/chat');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
        console.log("joining a room", data.roomid) 
        socket.join(data.roomid);
});

    socket.on('msg_send', async(data) => {  //collect by server
        console.log(data);
        const chat = await Chat.create({
            roomId: data.roomid,
            user: data.username,
            content: data.msg
        })

        io.to(data.roomid).emit('msg_rcvd', data); //collect by users 
    //     socket.emit('msg_rcvd', data);
    //     socket.brodcast.emit('msg_rcvd', data);
    });

    // functionality for typing
    socket.on('typing', (data) => {
        socket.broadcast.to(data.roomId).emit('someone_typing');
    })


});// from backend start listnict to the io

app.set('view engine', 'ejs');
// going to settup middleware for connection the static files with node(HTML is a ststic filr)
app.use('/', express.static(__dirname + '/public'));//this middle map that where is your static accests

app.get('/chat/:roomid', async(req, res) => {
    const chats = await Chat.find({
        roomId: req.params.roomid
    }).select('content user');
    console.log('chats');
   res.render('index', {
    name: "Gaurav",
    id: req.params.roomid,
    chats: chats
   });
})

server.listen(3000, async() => {
    console.log("Server Started");
    await connect();
    console.log("mongodb connected");
})