const mysql = require("mysql");
// 封装了promise的mysql操作
const co = require("co-mysql");
const config = require("../config");

const db = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME
});

console.log(3, db);
module.exports = co(db);
