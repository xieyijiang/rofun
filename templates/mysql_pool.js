// {{functionName}}.js
/**
 * 需要安装依赖：npm install --save mysql2
 * 同时确保node版本兼容
 * 例如：mysql2@3.9.7 要求 node>=8.0.0
 */
const mysql = require('mysql2');

module.exports = {
  method: [], // 空数组，不会生成路由
  // 主函数
  main: function() {
    // 连接池配置
    const poolConfig = {
      host: 'localhost',
      port: 3306,
      user: 'root',
      // password: '',
      database: '',
      connectionLimit: 10,
      // 其他配置...
    };

    const dbPool = mysql.createPool(poolConfig)

    return dbPool
  }
}