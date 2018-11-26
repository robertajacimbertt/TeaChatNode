let app = require('./config/server.js');

let port = 3000;

// let http = require('http').Server(app);
// var io = require('socket.io')(http);

let server = app.listen(port);
let io = require('socket.io').listen(server);

let messages = []; //talvez nao precise
let users = []; // tbm nao 
let connections = []; // sim

io.on('connection', socket => { // ao conectar um novo socket
    connections.push(socket); // add  no array 
    console.log(`Socket conectado: ${socket}`);
    let canal;
    socket.on('newChannel', (canal) => {
        console.log("Meu Canal = ", canal);
        canal = canal;
        socket.join(canal);
    });

    socket.emit('mensagensAnteriores', messages);

    socket.on('enviaMensagem', ({messageObject, canal}) => {
        console.log("Send message -> ", canal,  messageObject);
        // messages.push(messageObject);
        io.to(canal).emit('mensagemRecebida', messageObject);
    });

    socket.on('novoUsuario', (data, callback)=>{
        console.log("new user - > ", data)
        callback(true);
        socket.userName = data.author;
        users.push(socket.userName);
        updateUsernames();
    });

    socket.on('disconnect', data => {
        if(!socket.userName) return;
        users.splice(users.indexOf(socket.userName), 1);
        updateUsernames();
        console.log("Socket desconectado");
        connections.splice(connections.indexOf(socket), 1);
    });

    // function updateUsernames() {
    //     socket.emit("getUsers", users);
    // }
});
