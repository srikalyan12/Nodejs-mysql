const Product = require("../models/products");

const getProduct = (req, res) => {
  Product.findAll()
    .then((rows) => {
      res.render("shop/products-list", {
        prods: rows,
        pageTitle: "All Product",
        path: "/products",
      });
    })
    .catch((err) => console.log("*****This is from the getProduct", err));
};

const getIndex = (req, res) => {
  Product.findAll()
    .then((rows) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log("*****This is from the getIndex", err));
};

const getCart = (req, res) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
  // Cart.getCart((cart) => {
  //   Product.fetchAll((products) => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       pageTitle: 'Your Cart',
  //       path: '/cart',
  //       products: cartProducts,
  //     });
  //   });
  // });
};

const getCheckout = (req, res) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

const getOrders = (req, res) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders",
        orders,
      });
    })
    .catch((err) => console.log(err));
};

const getProductDetails = (req, res) => {
  const id = req.params.productId;
  Product.findById(id)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        path: "/products",
        pageTitle: product.title,
      });
    })
    .catch((err) => console.log(err));
};

const postCart = (req, res) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let newQty = 1;
      if (product) {
        const oldQty = product.cartItem.qty;
        newQty = newQty + oldQty;
      }
      return Product.findById(prodId)
        .then((product) => {
          return fetchedCart.addProduct(product, { through: { qty: newQty } });
        })
        .catch((err) => console.log(err));
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price, () => {
  //     res.redirect('/');
  //   });
  // });
};

const postCartDelete = (req, res) => {
  const prodId = req.body.productId;
  return req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
  // Product.findById(prodId, (product) => {
  //   Cart.deleteProduct(prodId, product.price, () => {
  //     res.redirect('/cart');
  //   });
  // });
};
const postOrder = (req, res) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      console.log("bfjdbfjdbfjbdj", products);
      return req.user
        .createOrder()
        .then((order) => {
          return products.forEach((product) => {
            console.log("Product****", product.cartItem);
            order.addProduct(product, {
              through: { qty: product.cartItem.qty },
            });
          });
          // products.map((product) => {
          //   product.orderItem = { qty: product.cartItem.qty };
          //   return product;
          // });
        })
        .then(() => {
          return fetchedCart.setProducts(null);
        })
        .then((result) => {
          res.redirect("/orders");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getProduct,
  getIndex,
  getCheckout,
  getCart,
  getOrders,
  getProductDetails,
  postCart,
  postCartDelete,
  postOrder,
};
