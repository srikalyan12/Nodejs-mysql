const Sequelize = require("sequelize");

const sequelize = require("../Database/mysql");

const orderItem = sequelize.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    allowNull: false,
  },
  qty: {
    type: Sequelize.INTEGER,
  },
});

module.exports = orderItem;
