require('module-alias/register');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const router = express.Router();
const port = 3000;

router.get('/', (req, res) => {
  res.send('Hello rofun!');
})

// #region (可选) 跨域设置
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173' // 允许来自 Vue 应用的请求
}));
// #endregion

// #region 动态创建路由
const functionsPath = 'functions'; // 函数根目录
const extName = '.js'; // 扩展名
const absoluteFunctionsPath = path.join(__dirname, functionsPath);
function generateRoutes(directory, router) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 如果是目录，则递归调用generateRoutes
      generateRoutes(fullPath, router);
    } else {
      // 如果是文件，创建路由
      if (path.extname(file) === extName) {
        // 将绝对路径转换为相对于根目录的路径
        const relativePath = path.relative(absoluteFunctionsPath, fullPath);
        // 从相对路径中去除根目录的名称，只保留后面的部分，并去除扩展名
        const routePath = relativePath.replace(new RegExp(`^${functionsPath}\/?`), '').slice(0, -(extName.length));
        const { method, main } = require(fullPath);

        if (Array.isArray(method) && method.length > 0) {
          method.forEach((m) => {
            // 可继续添加中间件
            router[m.toLowerCase()](`/${routePath}`, main);
          });
        }
      }
    }
  });
}
generateRoutes(absoluteFunctionsPath, router)
// #endregion

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', router);

// #region (可选) 进程关闭前关闭mysql连接池
// const mysqlPool = require('./database/mysql');
// async function closeDBPool() {
//   try {
//     await mysqlPool.end()
//     console.log('Database connection pool closed');
//   } catch (err) {
//     console.error('Error closing database connection pool', err);
//   } finally {
//     process.exit(0);
//   }
// }

// // 监听中断信号以关闭连接池
// process.on('SIGINT', closeDBPool);
// process.on('SIGTERM', closeDBPool);
// #endregion

// #region (可选) mqtt初始化，需预创建相关逻辑 (实例, 模型, 处理器)
// npm run add:tpt mqtt && npm run add:mod MQTT mqtt && npm run add:hdlr mqttHandler mqtt 
const MQTTModel = require('./models/MQTT');

const mqtt = new MQTTModel();
mqtt.run();
// #endregion

// #region (可选) socket.io初始化，与app.listen冲突，需预创建相关逻辑 (模型, 处理器)
// npm run add:mod SocketIO socket_io && npm run add:hdlr socketIOHandler socket_io
const server = require('http').createServer(app);
const SocketIOModel = require('./models/SocketIO');

const socketIO = new SocketIOModel(server);
socketIO.run();

server.listen(port, () => {
  console.log(`rofun has started and can be accessed at http://localhost:${port}`)
});
// #endregion

// app.listen(port, () => {
//   console.log(`rofun has started and can be accessed at http://localhost:${port}`);
// })