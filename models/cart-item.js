const Sequelize = require("sequelize");

const sequelize = require("../Database/mysql");

const cartItem = sequelize.define("cartItem", {
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

module.exports = cartItem;
