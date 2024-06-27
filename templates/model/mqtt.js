// _ModelName.js
const client = require('@/transports/mqtt');
const mqttHandler = require('@/handlers/mqttHandler');

class _ModelName {
  constructor() { }

  run() {
    // 当连接成功时触发
    client.on('connect', () => {
      mqttHandler.handleConnect()
    });

    // 当接收到消息时触发
    client.on('message', (topic, message) => {
      mqttHandler.handleMessage(topic, message)
    });

    // 当连接失败时触发
    client.on('error', (error) => {
      mqttHandler.handleError(error)
    });

    // 当连接断开时触发
    client.on('close', () => {
      mqttHandler.handleClose()
    });

    // 保持连接
    client.on('end', () => {
      mqttHandler.handleEnd()
    });
  }
}

module.exports = _ModelName