const DataTypes = require('sequelize');
const sequelize = require('../db/db');

const Category = sequelize.define(
  'categories',
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

module.exports = Category;
