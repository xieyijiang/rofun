// _middlewareName.js
const jwt = require('jsonwebtoken');

const _middlewareName = (req, res, next) => {
  // 从请求头中获取 token
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
  }

  // 验证 token
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // 将验证后的用户信息添加到请求对象
    next(); // 继续处理下一个中间件或路由处理程序
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token.' });
  }
};

module.exports = _middlewareName;