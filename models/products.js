const Sequelize = require('sequelize');

const sequelize = require('../Database/mysql');


// Create Table : Product Schema
const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

module.exports = Product;


// const fs = require('fs');
// const path = require('path');
// const Cart = require('./cart');
// const db = require('../Database/mysql');

// module.exports = class Product {
//   constructor(title, imageUrl, description, price) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//     this.id = Math.random().toString();
//   }

//   save() {
//     return db.execute("INSERT INTO products (title, imageUrl, description, price) VALUES (?, ? ,? , ?)", [
//       this.title, this.imageUrl, this.description, this.price
//     ])
//     // const p = path.join(__dirname, 'data', 'products.json');
//     // console.log(p);
//     // fs.readFile(path.join(__dirname, 'products.json'), (err, fileContent) => {
//     //   let products = [];
//     //   if (!err) {
//     //     products = JSON.parse(fileContent);
//     //   }
//     //   products.push(this);
//     //   fs.writeFile(
//     //     path.join(__dirname, 'products.json'),
//     //     JSON.stringify(products),
//     //     (err) => {
//     //       console.log('writeing ', err);
//     //     }
//     //   );
//     // });
//   }

//   static editProduct(product, cb) {
//     // this.fetchAll((products) => {
//     //   let existingProductIndex = products.findIndex(
//     //     (prod) => prod.id === product.id
//     //   );
//     //   const updatedProduct = [...products];
//     //   updatedProduct[existingProductIndex] = product;
//     //   fs.writeFile(
//     //     path.join(__dirname, 'products.json'),
//     //     JSON.stringify(updatedProduct),
//     //     (err) => {
//     //       console.log(err);
//     //       cb();
//     //     }
//     //   );
//     // });
//   }

//   static fetchAll(cb) {
//     console.log('fetchinh....');
//     return db.execute('SELECT * FROM products');
//     // fs.readFile(path.join(__dirname, 'products.json'), (err, fileContent) => {
//     //   if (err) {
//     //     return cb([]);
//     //   }
//     //   return cb(JSON.parse(fileContent));
//     // });
//   }

//   static findById(productId, cb) {
//      return db.execute('SELECT * from product where id= ?', [productId]);
//     // fs.readFile(path.join(__dirname, 'products.json'), (err, fileContent) => {
//     //   let products = [];
//     //   if (!err) {
//     //     products = JSON.parse(fileContent);

//     //     cb(products.find((product) => product.id === productId));
//     //   }
//     // });
//   }

//   static deleteProduct(id, cb) {
//     this.fetchAll((products) => {
//       const product = products.find((product) => product.id === id);
//       if (!product) {
//         return cb();
//       }
//       let updatedProduct = products.filter((prod) => id !== prod.id);
//       fs.writeFile(
//         path.join(__dirname, 'products.json'),
//         JSON.stringify(updatedProduct),
//         (err) => {
//           console.log(err);
//           Cart.deleteProduct(id, product.price, () => {
//             cb();
//           });
//         }
//       );
//     });
//   }
// };
