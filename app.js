const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express()
const port = 3000

app.get('/', (req, res) => {
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
            app[m.toLowerCase()](`/${routePath}`, main);
          });
        }
      }
    }
  });
}
generateRoutes(absoluteFunctionsPath)
// #endregion

// #region 初始化mysql连接池（建议在生产环境使用）
// // 确保已经创建了返回一个连接池实例的函数，可使用模板: npm run fun customName mysql_pool
// const functionName = 'customName'
// const { main: initDBPool } = require(`./functions/${functionName}`);
// // 初始化 DBPool
// const dbPool = initDBPool()

// // 应用程序关闭时，关闭连接池
// function closeDBPool() {
//   dbPool.end(function (err) {
//     if (err) {
//       console.error('Error closing database connection pool', err);
//     } else {
//       console.log('Database connection pool closed');
//     }
//     process.exit(0);
//   })
// }

// // 监听中断信号以关闭连接池
// process.on('SIGINT', closeDBPool);
// process.on('SIGTERM', closeDBPool);
// #endregion

app.listen(port, () => {
  console.log(`rofun has started and can be accessed at http://localhost:${port}`)
})