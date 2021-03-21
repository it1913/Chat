const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getUsers } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const chatName = 'SERVER';

// Statická složka
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    socket.on('joinChat', ({ username }) => {
        const user = userJoin(socket.id, username);
        //Pozdrav nově příchozího
        socket.emit('message', formatMessage(chatName, 'Vítej v chatovací místnosti.'));
        //Zpráva upozornující na nově příchozího uživatele
        socket.broadcast.emit('message', formatMessage(chatName, `${user.username} se připojil do chatu`));
    });


    //Zpráva upozornující na uživatele, který opouští chat
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.emit('message', formatMessage(chatName, `${user.username} opouští chat`));
        }

    });
    //
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        io.emit('message', formatMessage(user.username, msg));
    });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`);
});