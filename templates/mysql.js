// {{functionName}}.js
/**
 * 需要安装依赖：npm install --save mysql2
 * 同时确保node版本兼容
 * 例如：mysql2@3.9.7 要求 node>=8.0.0
 */
const mysql = require('mysql2/promise');

/**
 * 每次执行都会创建一个新的实例，仅适合调试
 * 正式环境应使用连接池模式
 * @returns {Promise<mysql.Connection>}
 */
const connect = async function () {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      // password: '',
      database: '',
    });
    console.log('connected!');
    return connection;
  } catch (err) {
    throw err;
  }
}

/**
 * 简单查询，SQL语句根据实际情况修改
 * @param {mysql.Connection} connection 
 * @returns {Array}
 */
const query = async function (connection) {
  try {
    const [results] = await connection.query(
      'SELECT * FROM `users` WHERE `name` = ? AND `age` = ?',
      ['James', 40]
    )
    return results
  } catch (err) {
    throw err
  }
}

module.exports = {
  method: ['GET', 'POST'], // ['PUT', 'DELETE', 'PATCH']
  // 主函数
  main: async function (req, res) {
    let conn
    try {
      conn = await connect();
      const results = await query(conn)
      res.json(results)
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      if (conn) {
        // 关闭数据库连接
        await conn.close();
      }
    }
  }
}