const User = require('../models/User');

const Product = require('../models/Product');
//encrypted password
const bcrypt = require('bcrypt');

const auth = require('../auth');

//Check if the email already exists
/*
1. use mongoose "find" method to find duplicate emails
2. use the then method to send a response back to the client

*/

module.exports.checkEmailExists = (reqBody) => {
  return User.find({ email: reqBody.email }).then((result) => {
    //if match is found
    if (result.length > 0) {
      return true;
    } else {
      //No duplicate email found
      //The user is not yet registered in the database
      return false;
    }
  });
};

module.exports.registerUser = (reqBody) => {
  //Creates a new User Object
  let newUser = new User({
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    mobileNo: reqBody.mobileNo,
    email: reqBody.email,
    //10 is the value provided as the number of "salt" rounds that the bcrypt algorithm will run in order to encrypt the password
    password: bcrypt.hashSync(reqBody.password, 10),
  });

  //Saves the created object to our database
  return newUser.save().then((user, error) => {
    //User registration failed
    if (error) {
      return false;
    } else {
      //User Registration is success
      return true;
    }
  });
};

module.exports.loginUser = (reqBody) => {
  //findOne it will returns the first record in the collection that matches the search criteria

  return User.findOne({ email: reqBody.email }).then((result) => {
    //User does not exist
    if (result == null) {
      return false;
    } else {
      //User exists

      //The "compareSync" method is used to compare a non encrypted password from the login form to the encrypted password retrieved from the database and returns "true" or "false".
      const isPasswordCorrect = bcrypt.compareSync(
        reqBody.password,
        result.password
      );

      //if the password match
      if (isPasswordCorrect) {
        //Generate an access token
        return { accessToken: auth.createAccessToken(result.toObject()) };
      } else {
        //Password does not match
        return false;
      }
    }
  });
};

//Retrieve user details

/*
Steps:
1. Find the document using the user's ID
2. Reassign the password of the returned document to an empty string
3. return the result back to the client
*/

module.exports.getProfile = (data) => {
  return User.findById(data).then((result) => {
    result.password = '';

    return result;
  });
};

//Enroll user to a course
/*
Steps:
1. Find the document in the database using the user's ID
2. Add the courseID to the user's enrollment array using the push method.
3. Add the userId to the course's enrollees arrays.
4. Save the document
5. validate, if both course ID and user ID successfully save to the database, return true to the client else, return false

*/

//Async and await - allow the processes to wait for each other

module.exports.enroll = async (data) => {
  console.log(data);
  if (data.isAdmin === true) {
    return false;
  } else {
    //Add the courseId to the enrollments array of the user

    let isUserUpdated = await User.findById(data.userId).then((user) => {
      //push the course Id to enrollments property

      user.enrollments.push({ courseId: data.courseId });

      //save
      return user.save().then((user, error) => {
        if (error) {
          return false;
        } else {
          return true;
        }
      });
    });

    let isProductUpdated = await Product.findById(data.courseId).then(
      (product) => {
        //add the userId in the course's database(enrollees)
        product.enrollees.push({ userId: data.userId });

        return product.save().then((product, error) => {
          if (error) {
            return false;
          } else {
            return true;
          }
        });
      }
    );

    //Validation
    if (isUserUpdated && isProductUpdated) {
      //user enrollment successful
      return true;
    } else {
      //user enrollment failed
      return false;
    }
  }
};
