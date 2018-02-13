const app = require('http').createServer();
const io = require('socket.io')(app);
const PORT = process.env.PORT;
app.listen(PORT);

let clientCount = 0;
io.on('connection', socket => {
  clientCount++;
  socket.nickname = `user${clientCount}`;
  io.emit('enter', `${socket.nickname} come in`);

  socket.on('message', value => {
    io.emit('message', `${socket.nickname} says: ${value}`);
  });

  socket.on('disconnect', () => {
    io.emit('leave', `${socket.nickname} left`);
  });
});

console.log(`websocket server listening on port ${PORT}`);