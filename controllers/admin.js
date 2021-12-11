const Product = require("../models/products");

const getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};
const postAddProduct = (req, res) => {
  const { title, imageUrl, description, price } = req.body;

  req.user
    .createProduct({ title, imageUrl, description, price })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
  // Product.create({ title, imageUrl, description, price, userId: req.user.id}).then(() => {
  //     res.redirect('/')
  //   }).catch(err => console.log(err));
};

const getEditProduct = (req, res) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/add-product",
        product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProduct = (req, res) => {
  req.user.getProducts().then((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
  // Product.findAll().then((products) => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products',
  //   });
  // });
};

const postEditProduct = (req, res) => {
  const prod = req.body;
  Product.update(prod, { where: { id: prod.id } })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch(() => console.log("Post edit product", err));
  // const products = Product.editProduct(product, () => {
  //   res.redirect('/admin/products');
  // });
};

const postDeleteProduct = (req, res) => {
  const productId = req.params.productId;
  Product.destroy({ where: { id: productId } })
    .then(() => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
