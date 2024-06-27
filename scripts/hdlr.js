const fs = require('fs');
const path = require('path');

// 获取命令行参数
const handlerName = process.argv[2];
const templateName = process.argv[3] || 'default'; // 例如 'mysql'
const templatesDir = path.join(__dirname, '..', 'templates/handler'); // templates文件夹的路径

// 构建模板文件的路径
const templatePath = path.join(templatesDir, `${templateName}.js`);

// 检查模板文件是否存在
if (!fs.existsSync(templatePath)) {
  console.error(`模板文件 ${templatePath} 不存在`);
  process.exit(1);
}

// 读取模板文件内容
let defaultCode = fs.readFileSync(templatePath, 'utf-8');

// 创建目录和文件
const directoryParts = handlerName.split('/');
const directory = path.join(__dirname, '..', 'handlers', ...directoryParts.slice(0, -1));
const filename = directoryParts.slice(-1)[0] + '.js';
const filePath = path.join(directory, filename);

// 确保所有父目录都存在
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`目录 ${dirPath} 已创建`);
  }
};

ensureDir(directory);

// 检查文件是否已经存在
if (fs.existsSync(filePath)) {
  console.log(`文件 ${filePath} 已经存在`);
} else {
  // 替换模板中的占位符
  defaultCode = defaultCode.replace(/_handlerName/g, handlerName);

  // 创建文件并写入代码
  fs.writeFileSync(filePath, defaultCode);
  console.log(`已创建文件 ${filePath}`);
}