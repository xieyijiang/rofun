const fs = require('fs');
const path = require('path');

// 获取命令行参数
const templateName = process.argv[2] || 'socket'; // 例如 'mysql'
const templatesDir = path.join(__dirname, '..', 'templates/transport'); // templates文件夹的路径

// 构建模板文件的路径
const templatePath = path.join(templatesDir, `${templateName}.js`);

// 检查模板文件是否存在
if (!fs.existsSync(templatePath)) {
  console.error(`模板文件 ${templatePath} 不存在`);
  process.exit(1);
}

// 执行对应的脚本模板
try {
  const script = require(templatePath)
  script.run()
} catch (err) {
  console.log('Invalid template');
}