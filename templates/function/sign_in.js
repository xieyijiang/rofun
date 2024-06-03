// _functionName.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rootDir = process.cwd();
const mysqlPool = require(`${rootDir}/databases/mysql`);

module.exports = {
  method: ['POST'],
  // 主函数
  main: async function (req, res) {
    const { username, password } = req.body
    let conn
    try {
      conn = await mysqlPool.getConnection();
      // 校验用户名
      const [result] = await conn.query(
        'SELECT * FROM `users` WHERE `username` = ?',
        [username]
      )
      if (!result || !result.length) {
        res.status(401).send('Invalid Username!')
        return
      }
      // 校验密码
      const hashedPassword = result[0].password
      const isMatch = await bcrypt.compare(password, hashedPassword)
      if (!isMatch) {
        res.status(401).send('Invalid Password!')
        return
      }
      // 签发token
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '7d' })
      res.json({ token, expires_in: 604800 })
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