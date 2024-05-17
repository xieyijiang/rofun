const fs = require('fs');
const path = require('path');

function run() {
  // 文件内容
  const mysqlConfigContent =
`module.exports = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};`;

  const mysqlContent =
`const mysql = require('mysql2/promise');
const mysqlConfig = require('../config/mysql_config');

const pool = mysql.createPool(mysqlConfig);

module.exports = pool;`;

  const envContent =
`MYSQL_HOST="localhost"
MYSQL_PORT=3306
MYSQL_USER="root"
MYSQL_PASSWORD="password"
MYSQL_DATABASE="database"`;

  // 文件路径
  const mysqlConfigDirectory = path.join(__dirname, '../../config');
  const mysqlConfigPath = path.join(mysqlConfigDirectory, 'mysql_config.js');
  const mysqlDirectory = path.join(__dirname, '../../database');
  const mysqlPath = path.join(mysqlDirectory, 'mysql.js');
  const envPath = path.join(__dirname, '../../.env');

  // 确保所有父目录都存在
  function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`目录 ${dirPath} 已创建`);
    }
  };
  ensureDir(mysqlConfigDirectory);
  ensureDir(mysqlDirectory);

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
        fs.writeFile(filePath, content, err => {
          if (err) throw err;
          console.log(`${path.basename(filePath)} has been updated.`);
        });
      }
    });
  }

  // 检查并写入文件
  checkAndWriteFile(mysqlConfigPath, mysqlConfigContent);
  checkAndWriteFile(mysqlPath, mysqlContent);
  checkAndWriteFile(envPath, envContent);
}

module.exports = {
  run
}