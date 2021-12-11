const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

//Mysql connection pool, pool has multiple instance of database connection instances

const sequelize = require("./Database/mysql");

// Model
const Product = require("./models/products");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

// const bodyParser = require('body-parser');
const app = express();

//Setting view
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoute = require("./routers/admin");
const shopRoute = require("./routers/shop");

// db.execute('select * from products')
//   .then((res) => {
//     console.log('result', res);
//   })
//   .catch((err) => {
//     console.log('err', err);
//   });

//we can use both express and bodyParser
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoute.router);

app.use(shopRoute);

app.use((req, res) => {
  //res.status(404).sendFile(path.join(__dirname, './views/page-not-found.html'));
  res
    .status(404)
    .render("page-not-found", { pageTitle: " Page Not Found", path: "/" });
});

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
Cart.belongsTo(User);
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

sequelize
  .sync()
  .then(() => {
    return User.findById(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Srikalyan", email: "srikalyan.RS@mail.com" });
    }
    return user;
  })
  .then((user) => {
    return user.getCart();
  })
  .then((cart) => {
    if (!cart) {
      return Cart.create({ userId: 1 });
    }
    return cart;
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("server started listening to port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
