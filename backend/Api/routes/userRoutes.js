const express = require('express');
const router = express.Router();
const auth = require('../auth');

const UserController = require('../controllers/userControllers');

//Route for checking if the user's email already exists in the database

router.post('/checkEmail', (req, res) => {
  UserController.checkEmailExists(req.body).then((result) => res.send(result));
});

//Registration for user
//http://localhost:4000/api/users/register
router.post('/register', (req, res) => {
  UserController.registerUser(req.body).then((result) => res.send(result));
});

//User Authentication(login)
router.post('/login', (req, res) => {
  UserController.loginUser(req.body).then((result) => res.send(result));
});

//==================================================
//Activity Solution
//Retrieving user details using the post method
// router.post("/details", (req, res) => {
// 	UserController.getProfile(req.body.id).then(result => res.send(result));
// })

//get user details using the wildcard
// router.get('/details/:id', (req, res) => {
// 	UserController.getProfile(req.params.id).then(result => res.send(result))
// });
//==================================================

//The "auth.verify" acts as a middleware to ensure that the user is logged in before they can get the details of a user
router.get('/details', auth.verify, (req, res) => {
  //decode() to retrieve the user information from the token passing the "token" from te request headers as an argument

  const userData = auth.decode(req.headers.authorization);

  UserController.getProfile(userData.id).then((result) => res.send(result));
});

//Enroll user to a course

router.post('/enroll', auth.verify, (req, res) => {
  let data = {
    userId: auth.decode(req.headers.authorization).id,
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
    courseId: req.body.courseId,
  };

  UserController.enroll(data).then((result) => res.send(result));
});

module.exports = router;
