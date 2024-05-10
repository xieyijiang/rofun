const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello rofun!')
})

// 动态创建路由
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
            app[m.toLowerCase()](`/${routePath}`, main);
          });
        }
      }
    }
  });
}
generateRoutes(absoluteFunctionsPath)

app.listen(port, () => {
  console.log(`rofun listening on port ${port}`)
})