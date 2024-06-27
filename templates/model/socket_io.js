// _ModelName.js
const { Server } = require('socket.io');
const socketIOHandler = require('@/handlers/socketIOHandler');

class _ModelName {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: "http://localhost:5173"
      }
    });
  }

  run() {
    this.io.on('connection', socketIOHandler.handleConnection);
  }
}

module.exports = _ModelName