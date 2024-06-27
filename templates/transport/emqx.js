const fs = require('fs');
const path = require('path');

const emqxConfigContent =
`module.exports = {
  host: process.env.EMQX_HOST,
  port: process.env.EMQX_PORT,
  apiKey: process.env.EMQX_API_KEY,
  secretKey: process.env.EMQX_SECRET_KEY,
};`;

const envContent =
`EMQX_API_KEY="your emqx apiKey"
EMQX_SECRET_KEY="your emqx secretKey"`;

// 文件路径
const emqxConfigDirectory = path.join(__dirname, '../../config');
const emqxConfigPath = path.join(emqxConfigDirectory, 'emqx_config.js');
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
  ensureDir(emqxConfigDirectory);

  // 检查并写入文件
  checkAndWriteFile(emqxConfigPath, emqxConfigContent);
  checkAndWriteFile(envPath, envContent);
}

module.exports = {
  run
}