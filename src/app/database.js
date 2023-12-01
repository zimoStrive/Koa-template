const mysql = require('mysql2')
const databaseConfig = require('../config/database')

//创建连接池
const connectionPool = mysql.createPool({
  host: databaseConfig.host,
  port: databaseConfig.port,
  database: databaseConfig.database,
  user: databaseConfig.user,
  password: databaseConfig.password,
  connectionLimit: databaseConfig.connectionLimit,
})

// 2.获取连接是否成功
connectionPool.getConnection((err, connection) => {
  // 1.判断是否有错误信息
  if (err) {
    console.log(`获取连接失败~~ ${databaseConfig.host}:${databaseConfig.port}`, err)
    return
  }

  // 2.获取connection, 尝试和数据库建立一下连接
  connection.connect((err) => {
    if (err) {
      console.log(`数据库交互失败~~ ${databaseConfig.host}:${databaseConfig.port}`, err)
    } else {
      console.log(`数据库连接成功, 可以操作数据库~~ ${databaseConfig.host}:${databaseConfig.port}`)
    }
  })
})

// 3.获取连接池中连接对象(promise)
const connection = connectionPool.promise()
module.exports = connection
