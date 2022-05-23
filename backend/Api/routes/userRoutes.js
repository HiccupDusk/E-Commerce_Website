const express = require('express');
const router = express.Router();
const auth = require('../auth');

const UserController = require('../controllers/userControllers');

//Route for checking if the user's email already exists in the database
router.get('/getAllUser', (req, res) => {
  UserController.getAllUser().then((result) => res.send(result));
});

router.post('/checkEmail', (req, res) => {
  UserController.checkEmailExists(req.body).then((result) => res.send(result));
});

//Registration for user -----------------------------------------------------------------------------
//http://localhost:4000/api/users/register
router.post('/register', (req, res) => {
  UserController.registerUser(req.body).then((result) => res.send(result));
});

//User Authentication(login) -----------------------------------------------------------------------------
router.post('/login', (req, res) => {
  UserController.loginUser(req.body).then((result) => res.send(result));
});

//The "auth.verify" acts as a middleware to ensure that the user is logged in before they can get the details of a user
router.get('/details', auth.verify, (req, res) => {
  //decode() to retrieve the user information from the token passing the "token" from te request headers as an argument
  const userData = auth.decode(req.headers.authorization);

  UserController.getProfile(userData.id).then((result) => res.send(result));
});

// RETRIEVE AUTHETICATED USER'S ORDER-----------------------------------------------------------------------------
router.get('/retrieveOrders', auth.verify, (req, res) => {
  const data = auth.decode(req.headers.authorization);

  UserController.retrieveOrders(data.id).then((result) => res.send(result));
});

//Add a product to the user's cart (USER) -----------------------------------------------------------------------------
router.post('/addToCart', auth.verify, (req, res) => {
  let data = {
    userId: auth.decode(req.headers.authorization).id,
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
    productId: req.body.productId,
  };

  UserController.addToCart(data).then((result) => res.send(result));
});

//  -----------------------------------------------------------------------------
router.post('/checkOut', auth.verify, (req, res) => {
  let data = {
    userId: auth.decode(req.headers.authorization).id,
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
    productId: req.body.productId,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };

  UserController.checkOut(data).then((result) => res.send(result));
});

module.exports = router;
