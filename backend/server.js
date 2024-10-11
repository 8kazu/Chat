const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Express アプリを作成
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log('ユーザーが接続しました');

    // メッセージの受信と送信
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('ユーザーが切断しました');
    });
});

app.get('/', (req, res) => {
    res.send('Chat App Backend');
});

server.listen(3000, () => {
    console.log('サーバーがポート3000で稼働しています');
});
