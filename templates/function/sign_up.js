// _functionName.js
const bcrypt = require('bcrypt');
const mysqlPool = require('@/databases/mysql');

module.exports = {
  method: ['POST'],
  // 主函数
  main: async function (req, res) {
    const { username, password } = req.body
    const saltRounds = 10
    let conn
    try {
      conn = await mysqlPool.getConnection();
      // 校验用户名
      const [result] = await conn.query(
        'SELECT * FROM `users` WHERE `username` = ?',
        [username]
      )
      if (result.length > 0) {
        res.status(409).send('Username already exists.')
        return
      }
      // 密码加密
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      // 生成其他属性
      const created_at = updated_at = Date.now()
      // 将用户信息存入数据库
      const sql = 'INSERT INTO users (username, password, created_at, updated_at) VALUES (?, ?, ?, ?)';
      const [insertResult] = await conn.query(sql, [
        username,
        hashedPassword,
        created_at,
        updated_at
      ])
      console.log('Inserted user with ID:', insertResult.insertId);
      res.send('Sign up succeed!')
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    } finally {
      if (conn) {
        conn.release()
      }
    }
  }
}