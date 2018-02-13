const PORT = process.env.PORT;
const ws = require("nodejs-websocket");

// 如果需要区分消息的类型（come/message/left）以及需要知道是哪个用户发送的消息，可以尝试在sendText的时候发送一个经过JSON.stringify处理后的对象
let clientCount = 0;
const server = ws.createServer(client => {
  console.log('websocket start!');
  clientCount++;
  client.nickname = `user${clientCount}`;
  // 向所有已经连接的client广播有新用户come in  
  broadcast(`${client.nickname} come in`);
  client.on('text', message => {
    console.log('websocket server received message: ', message);
    // 向所有已经连接的client广播聊天内容
    broadcast(message);
  }); 
  client.on('close', (code, reason) => {
    console.log(code, reason);
    broadcast(`${client.nickname} left`);
  });
  client.on('error', err => {
    console.log('error message: ', err);
  });
}).listen(PORT);

function broadcast(value) {
  // server.connections属性上保存着所有已经连接的设备
  server.connections.forEach(client => {
    client.sendText(value);
  })
}