require('dotenv').config();

const environment = process.env.NODE_ENV || 'test';

const options = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || '3306',
  database:process.env.MYSQL_DB_NAME || 'sistema-autenticacao',
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MTSQL_PASSWORD || 'password',
  dialect: 'mysql',
};

module.exports = {
  development: { ...options },
  test: { ...options },
  production: { ...options },
};