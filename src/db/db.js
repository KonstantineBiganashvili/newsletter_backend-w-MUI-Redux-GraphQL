const Sequelize = require('sequelize');

const sequelize = new Sequelize('article_db', 'kote', 'kote', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
