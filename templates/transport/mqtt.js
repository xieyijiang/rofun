const fs = require('fs');
const path = require('path');

const mqttConfigContent =
`module.exports = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  clientId: 'rofun_' + Math.random().toString(16).slice(2, 10)
};`;

const mqttContent = 
`const mqtt = require("mqtt");
const config = require('../config/mqtt_config');

const client = mqtt.connect(config);

module.exports = client;`;

const envContent =
`MQTT_HOST="localhost"
MQTT_PORT=1883
MQTT_USERNAME="admin"
MQTT_PASSWORD="password"`;

// 文件路径
const mqttConfigDirectory = path.join(__dirname, '../../config');
const mqttConfigPath = path.join(mqttConfigDirectory, 'mqtt_config.js');
const mqttDirectory = path.join(__dirname, '../../transports');
const mqttPath = path.join(mqttDirectory, 'mqtt.js');
const envPath = path.join(__dirname, '../../.env');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`目录 ${dirPath} 已创建`);
  }
};

// 检查文件是否存在以及内容是否符合预期
function checkAndWriteFile(filePath, content) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err && err.code === 'ENOENT') {
      // 文件不存在，创建文件并写入内容
      fs.writeFile(filePath, content, err => {
        if (err) throw err;
        console.log(`${path.basename(filePath)} has been created.`);
      });
    } else if (err) {
      // 读取文件时发生错误
      console.error(err);
    } else if (data.includes(content)) {
      // 文件存在且包含预期内容，不执行写入操作
      console.log(`${path.basename(filePath)} already has the expected content.`);
    } else {
      // 文件存在但内容不符合预期，写入新内容
      fs.appendFile(filePath, `\n${content}`, err => {
        if (err) throw err;
        console.log(`${path.basename(filePath)} has been updated.`);
      });
    }
  });
}

function run() {
  // 确保所有父目录都存在
  ensureDir(mqttConfigDirectory);
  ensureDir(mqttDirectory);

  // 检查并写入文件
  checkAndWriteFile(mqttConfigPath, mqttConfigContent);
  checkAndWriteFile(mqttPath, mqttContent);
  checkAndWriteFile(envPath, envContent);
}

module.exports = {
  run
}