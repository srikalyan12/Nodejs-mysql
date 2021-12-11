const Sequelize  = require('sequelize');
const Sqeuelize = require('sequelize');

const sequelize = require('./../Database/mysql');


const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
})

module.exports = Cart;
// const fs = require('fs');
// const path = require('path');
// const p = path.join(__dirname, 'cart.json');
// module.exports = class Cart {
//   static addProduct(id, productPrice, cb) {
//     let cart = { products: [], totalPrice: 0 };
//     fs.readFile(p, (err, fileContent) => {
//       if (!err) {
//         cart = JSON.parse(fileContent);
//       }
//       const existingProductIndex = cart.products.findIndex(
//         (prod) => prod.id === id
//       );
//       const existingProduct = cart.products[existingProductIndex];
//       let updatedProduct;
//       if (existingProduct) {
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty = updatedProduct.qty + 1;
//         cart.products = [...cart.products];
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         updatedProduct = { id: id, qty: 1 };
//         cart.products = [...cart.products, updatedProduct];
//       }
//       cart.totalPrice = cart.totalPrice + parseInt(productPrice);
//       fs.writeFile(p, JSON.stringify(cart), (err) => {
//         console.log(err);
//         cb();
//       });
//     });
//   }

//   static deleteProduct(id, productPrice, cb) {
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         return;
//       }
//       const updateCart = { ...JSON.parse(fileContent) };
//       const product = updateCart.products.find((product) => product.id === id);
//       if (!product) {
//         return;
//       }
//       updateCart.products = updateCart.products.filter(
//         (prod) => id !== prod.id
//       );
//       updateCart.totalPrice =
//         updateCart.totalPrice - product.qty * productPrice;

//       fs.writeFile(p, JSON.stringify(updateCart), (err) => {
//         cb();
//       });
//     });
//   }

//   static getCart(cb) {
//     fs.readFile(p, (err, fileContent) => {
//       const cart = JSON.parse(fileContent);
//       if (err) {
//         cb(null);
//       }
//       cb(cart);
//     });
//   }
// };
