const client = require('@/transports/mqtt')

const handleConnect = function () {
  console.log('Connected to MQTT Broker');
  // 订阅某个主题
  client.subscribe('device/#', (err) => {
    if (!err) {
      console.log('Subscribed to device/#');
    }
  });
}

const handleMessage = function (topic, message) {
  console.log(`Received message from topic: ${topic}`);
  console.log(`Message: ${message.toString()}`);
}

const handleError = function (error) {
  console.error('Connection error:', error);
}

const handleClose = function () {
  console.log('Connection closed');
}

const handleEnd = function () {
  console.log('Connection ended');
}

module.exports = { handleConnect, handleMessage, handleError, handleClose, handleEnd }