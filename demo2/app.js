const PORT = process.env.PORT;
const ws = require("nodejs-websocket");
 
// Scream server example: "hi" -> "HI!!!" 
const server = ws.createServer(client => {
  console.log('websocket start!');
  client.on('text', message => {
    console.log('websocket server received message: ', message);
    client.sendText(`${message.toUpperCase()}!!!`);
  }); 
  client.on('close', (code, reason) => {
    console.log(code, reason);
  });
  client.on('error', err => {
    console.log('error message: ', err);
  });
}).listen(PORT);
