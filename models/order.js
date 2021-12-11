const Sequelize = require("sequelize");
const Sqeuelize = require("sequelize");

const sequelize = require("./../Database/mysql");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Order;
