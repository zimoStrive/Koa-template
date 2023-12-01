const dotenv = require('dotenv')

dotenv.config()

module.exports = { SERVER_PORT, SERVER_HOST, MYSQL_HOST, MYSQL_PORT } = process.env
