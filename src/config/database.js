const { MYSQL_HOST, MYSQL_PORT } = require('./service')

// 开发环境
const development = {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: 'coderhub',
  user: 'root',
  password: 'root',
  connectionLimit: 5,
}

// 生产环境
const production = {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: 'coderhub',
  user: 'root',
  password: 'root',
  connectionLimit: 10,
}

module.exports = { development, production }[process.env.NODE_ENV]
