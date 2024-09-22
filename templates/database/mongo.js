const fs = require('fs');
const path = require('path');

// 文件内容
const mongoConfigContent =
`module.exports = {
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  database: process.env.MONGO_DATABASE,
};`;

const mongoContent =
`const { MongoClient } = require('mongodb');
const { host, port, username, password, database } = require('../config/mongo_config');

// const url = \`mongodb://\${username}:\${password}@\${host}:\${port}\`;
const url = \`mongodb://\${host}:\${port}\`;
const client = new MongoClient(url, {
  family: 4,
});

module.exports = client;`;

const envContent =
`MONGO_HOST="example.com"
MONGO_PORT=27017
MONGO_USERNAME="root"
MONGO_PASSWORD="password"
MONGO_DATABASE="test"`;

// 文件路径
const mongoConfigDirectory = path.join(__dirname, '../../config');
const mongoConfigPath = path.join(mongoConfigDirectory, 'mongo_config.js');
const mongoDirectory = path.join(__dirname, '../../databases');
const mongoPath = path.join(mongoDirectory, 'mongo.js');
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
  ensureDir(mongoConfigDirectory);
  ensureDir(mongoDirectory);

  // 检查并写入文件
  checkAndWriteFile(mongoConfigPath, mongoConfigContent);
  checkAndWriteFile(mongoPath, mongoContent);
  checkAndWriteFile(envPath, envContent);
}

module.exports = {
  run
}