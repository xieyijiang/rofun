const fs = require('fs');
const path = require('path');

const middlewaresPath = path.join(__dirname, '..', 'middlewares');

function getMiddlewares(directory, arr = []) {
  const rootPath = path.join(__dirname, '..', 'middlewares');
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getMiddlewares(fullPath, arr);
    } else {
      const relativePath = path.relative(rootPath, fullPath); // 获取相对路径
      const relativePathWithoutExt = relativePath.slice(0, -3); // 去掉 .js 扩展名
      arr.push(relativePathWithoutExt);
    }
  })
  return arr
}

const middlewares = getMiddlewares(middlewaresPath);
console.log(middlewares)