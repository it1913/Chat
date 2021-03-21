const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const chatName = 'SERVER';

// Statická složka
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    //Pozdrav nově příchozího
    socket.emit('message',formatMessage(chatName,'Vítej v chatovací místnosti.'));
    //Zpráva upozornující na nově příchozího uživatele
    socket.broadcast.emit('message',formatMessage(chatName,'Uživatel se připojil do chatu'));
    //Zpráva upozornující na uživatele, který opouští chat
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(chatName,'Uživatel opouští chat'));
    });
    //
    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('USER', msg));
    });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`);
});