const DataTypes = require('sequelize');
const sequelize = require('../db/db');
const Category = require('./Category');

const Article = sequelize.define('articles', {
  title: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  surname: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
  email: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.NUMBER,
  },
  content: {
    type: DataTypes.STRING,
  },
  categoryId: {
    type: DataTypes.NUMBER,
  },
});

Article.belongsTo(Category);

module.exports = Article;
