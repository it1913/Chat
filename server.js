const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Statická složka
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    //Pozdrav nově příchozího
    socket.emit('message', 'Vítej v chatovací místonosti.');
     //Zpráva upozornující na nově příchozího uživatele
     socket.broadcast.emit('message', 'Uživatel se připojil do chatu');
     //Zpráva upozornující na uživatele, který opouští chat
    socket.on('disconnect', () => {
        io.emit('message', 'Uživatel opouští chat');
    });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`);
});