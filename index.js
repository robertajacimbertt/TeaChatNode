let app = require('./config/server.js');

let port = 3000;

let http = require('http').Server(app);
var io = require('socket.io')(http);

var server = app.listen(port)
var io = require('socket.io').listen(server);

let messages = [];

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data =>{
        console.log(data);
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
});
