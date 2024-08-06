// _functionName.js
/**
 * 确保已经创建了mysql连接池的相关配置和实例
 * 可使用命令快速创建 npm run db
 * 引用路径可自行更改为相对路径
 */
const mysqlPool = require('@/databases/mysql');

module.exports = {
  method: ['GET', 'POST'], // ['PUT', 'DELETE', 'PATCH']
  middleware: {
    global: [],
    get: [],
    post: []
  },
  // 主函数
  main: async function (req, res) {
    let conn;
    const page = req.body.page || 1;
    const limit = req.body.limit || 20;
    const sortBy = req.body.sortBy || 'created_at';
    const sortOrder = req.body.sortOrder || 'DESC';
    try {
      conn = await mysqlPool.getConnection();

      // (可选) 使用事务
      // await conn.beginTransaction();

      // 分页查询
      const offset = parseInt((page - 1) * limit);
      const [result] = await conn.query(
        `SELECT * FROM users ORDER BY ${sortBy} ${sortOrder} LIMIT ? OFFSET ?`,
        [parseInt(limit), offset]
      );

      // (可选) 提交事务
      // await conn.commit();

      res.json(result);
    } catch (err) {
      // (可选) 如果发生错误，回滚事务
      // await conn.rollback();
    } finally {
      if (conn) conn.release();
    }
  }
}