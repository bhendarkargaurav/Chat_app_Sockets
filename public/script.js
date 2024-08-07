// client

var socket = io();// from frountend expect to call io

let btn = document.getElementById('btn');
let inputMsg = document.getElementById('newmsg');
let msgList = document.getElementById('msglist');

//send by client
btn.onclick = function exec() {
    socket.emit('msg_send', {
        msg: inputMsg.value
    });
}

//after reciving msg this happening
socket.on('msg_rcvd', (data) => {
    let limsg = document.createElement('li');
    limsg.innerText = data.msg;
    msgList.appendChild(limsg);
});