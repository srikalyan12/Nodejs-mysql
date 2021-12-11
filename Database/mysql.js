// const mysql = require('mysql2');

// const connectionPool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'nodejs',
//   password: 'root',
// });

// module.exports = connectionPool.promise();


const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs', 'root', 'root', { dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;