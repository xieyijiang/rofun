// _functionName.js
/**
 * 确保已经创建了mysql连接池的相关配置和实例
 * 可使用命令快速创建 npm run db
 * 引用路径可自行更改为相对路径
 */
const mysqlPool = require('@/databases/mysql');

module.exports = {
  method: ['GET', 'POST'], // ['PUT', 'DELETE', 'PATCH']
  // 主函数
  main: async function (req, res) {
    const conn = await mysqlPool.getConnection();
    // SQL语句仅作示例
    const [result] = await conn.query(
      'SELECT * FROM `users` WHERE `name` = ? AND `age` = ?',
      ['James', 40]
    );
    // 释放连接实例回到连接池
    conn.release();

    res.json(result);
  }
}