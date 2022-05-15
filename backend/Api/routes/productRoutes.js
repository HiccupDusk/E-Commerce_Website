const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productControllers');
const auth = require('../auth');

//Creating a course
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

//Answer
// router.post("/", auth.verify, (req, res) => {
// 	const userData = auth.decode(req.headers.authorization);
// 	isAdmin = userData.isAdmin;
// 	console.log(isAdmin);
// 	if (isAdmin) {
// 		CourseController.addCourse(req.body).then(result => res.send(result));
// 	}	else{
// 		res.send(false);
// 	}
// });

//Retrieving ALL courses
router.get('/all', (req, res) => {
  ProductController.getAllProduct().then((result) => res.send(result));
});

//Retrieving all ACTIVE courses
router.get('/', (req, res) => {
  ProductController.getAllActive().then((result) => res.send(result));
});

//Retrieving a SPECIFIC course
router.get('/:courseId', (req, res) => {
  ProductController.getProduct(req.params.courseId).then((result) =>
    res.send(result)
  );
});

//Update a course

router.put('/:courseId', auth.verify, (req, res) => {
  const data = {
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };

  if (data.isAdmin) {
    ProductController.updateCourse(req.params.courseId, req.body).then(
      (result) => res.send(result)
    );
  } else {
    res.send(false);
  }
});

//Activity:

/*

1. Create a route for archiving a course. The route must use JWT authentication and obtain the course ID from the url.
2. Create a controller method for archiving a course obtaining the course ID changing the isActive true to false
3. Process a PUT request at the /courseId/archive route using postman to archive a course
4. Create a git repository named S35.
5. Add another remote link and push to git with the commit message of Add activity code - S35 Activity.
6. Add the link in Boodle named "Express js API Development Part 4".


*/

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
