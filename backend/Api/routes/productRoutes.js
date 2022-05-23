const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productControllers');
const auth = require('../auth');

//Retrieving ALL products
router.get('/all', (req, res) => {
  ProductController.getAllProduct().then((result) => res.send(result));
});

//Retrieving all ACTIVE products
router.get('/', (req, res) => {
  ProductController.getAllActive().then((result) => res.send(result));
});

//RETRIEVE USER'S ORDER DETAIL
router.get('/retrieveOrderUser', (req, res) => {
  // const data = auth.decode(req.headers.authorization);
  const data = {
    userId: auth.decode(req.headers.authorization).id,
    // isAdmin: auth.decode(req.headers.authorization).isAdmin,
    // productId: req.body.productId,
  };
  ProductController.retrieveOrderUser(data).then((result) => res.send(result));
});

router.post('/removeFromCart', (req, res) => {
  // const data = auth.decode(req.headers.authorization);
  const data = {
    userId: auth.decode(req.headers.authorization).id,
    productId: req.body.productId,
    // isAdmin: auth.decode(req.headers.authorization).isAdmin,
    // productId: req.body.productId,
  };
  ProductController.removeFromCart(data).then((result) => res.send(result));
});

// ADD TOTAL CARTS FROM USER
router.post('/addTotalOrders', (req, res) => {
  // const data = auth.decode(req.headers.authorization);
  const data = {
    userId: auth.decode(req.headers.authorization).id,
    productId: req.body.productId,
    // isAdmin: auth.decode(req.headers.authorization).isAdmin,
    // productId: req.body.productId,
  };
  ProductController.addTotalOrders(data).then((result) => res.send(result));
});

//Retrieving a SPECIFIC products
router.get('/specificProduct/:productId', (req, res) => {
  ProductController.getProduct(req.params.productId).then((result) =>
    res.send(result)
  );
});

//Creating a products (ADMIN)
router.post('/createProduct', auth.verify, (req, res) => {
  const data = {
    product: req.body,
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };

  console.log(data.isAdmin);

  if (data.isAdmin) {
    ProductController.addProduct(data).then((result) => res.send(result));
  } else {
    res.send({ auth: "You're not an admin" });
  }
});

//Update a products(ADMIN)
router.put('/:productId', auth.verify, (req, res) => {
  const data = {
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };

  if (data.isAdmin) {
    ProductController.updateProduct(req.params.productId, req.body).then(
      (result) => res.send(result)
    );
  } else {
    res.send(false);
  }
});

// ARCHIVE (ADMIN)
router.put('/:courseId/archive', auth.verify, (req, res) => {
  const data = {
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };

  if (data.isAdmin) {
    CourseController.archiveCourse(req.params.courseId).then((result) =>
      res.send(result)
    );
  } else {
    res.send(false);
  }
});

module.exports = router;
