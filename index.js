let app = require('./config/server.js');

let port = 3000;

// let http = require('http').Server(app);
// var io = require('socket.io')(http);

let server = app.listen(port);
let io = require('socket.io').listen(server);

let messages = [];
let users = [];
let connections = [];

io.on('connection', socket => { // ao conectar um novo socket
    connections.push(socket); // add  no array 
    console.log(`Socket conectado: ${socket}`);

    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data =>{
        console.log("Send message -> ", data);
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });

    socket.on('disconnect', data => {
        if(!socket.userName) return;
        users.splice(users.indexOf(socket.userName), 1);
        updateUsernames();
        console.log("Socket desconectado");
        connections.splice(connections.indexOf(socket), 1);
    });

    socket.on('newUser', (data, callback)=>{
        console.log("new user - > ", data)
        callback(true);
        socket.userName = data.author;
        users.push(socket.userName);
        updateUsernames();
    });

    function updateUsernames() {
        socket.emit("getUsers", users);
    }
});
