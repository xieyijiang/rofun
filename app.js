require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express()
const router = express.Router()
const port = 3000

router.get('/', (req, res) => {
  res.send('Hello rofun!')
})

// #region 动态创建路由
const functionsPath = 'functions'; // 函数根目录
const extName = '.js'; // 扩展名
const absoluteFunctionsPath = path.join(__dirname, functionsPath);
function generateRoutes(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 如果是目录，则递归调用generateRoutes
      generateRoutes(fullPath);
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
generateRoutes(absoluteFunctionsPath)
// #endregion

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

// #region (可选) 使用 socket.io 时需要使用 http 模块
// const server = require('http').createServer(app);
// const { Server } = require('socket.io');
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173"
//   }
// });

// const onConnection = (socket) => {
//   // custom handlers...
//   console.log(`socket ${socket.id} connected!`)
//   socket.on('disconnect', (reason) => {
//     console.log(`${socket.id} disconnected, reason: ${reason}`)
//   })
// }

// io.on('connection', onConnection);

// server.listen(port, () => {
//   console.log(`rofun has started and can be accessed at http://localhost:${port}`)
// });
// #endregion

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`rofun has started and can be accessed at http://localhost:${port}`)
})