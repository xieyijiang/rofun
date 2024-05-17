const mysql = require('mysql2/promise');
const mysqlConfig = require('../config/mysql_config');

const pool = mysql.createPool(mysqlConfig);

module.exports = pool;