const Product = require('../models/Product');

//Create a new course
/*
Steps:
1. Create a new Course object
2. Save to the database
3. error handling
*/

module.exports.addProduct = (data) => {
  //Create a new object
  let newProduct = new Product({
    name: data.product.name,
    description: data.product.description,
    price: data.product.price,
  });

  //Saves the created object to our database
  return newProduct.save().then((_product, error) => {
    //Course creation failed
    if (error) {
      return false;
    } else {
      //Course Creation successful
      return true;
    }
  });
};

//Retrieving All courses ---------------------------------------
module.exports.getAllProduct = () => {
  return Product.find({}).then((result) => {
    return result;
  });
};

//Retrieve all ACTIVE courses
module.exports.getAllActive = () => {
  return Product.find({ isActive: true }).then((result) => {
    return result;
  });
};
// Retrieve User Order
module.exports.retrieveOrderUser = (data) => {
  return Product.find({
    customers: { $elemMatch: { userId: data.userId } },
  }).then((result) => {
    return result;
  });
};

// Remove From cart
module.exports.removeFromCart = (data) => {
  return Product.updateOne(
    { _id: data.productId },
    { $pull: { customers: { userId: data.userId } } }
  ).then((result) => {
    return result;
  });
  s;
};

// ADD TOTAL CARTS FROM USER
module.exports.addTotalOrders = (data) => {
  return Product.aggregate([
    {
      $match: {
        customers: { $elemMatch: { userId: data.userId } },
      },
    },
    { $group: { _id: '', price: { $sum: '$price' } } },
    {
      $project: {
        _id: 0,
        price: '$price',
      },
    },
  ]);
};

//Retrieve SPECIFIC course ---------------------------------------

module.exports.getProduct = (reqParams) => {
  return Product.findById(reqParams).then((result) => {
    return result;
  });
};

//Update a course ---------------------------------------

module.exports.updateProduct = (productId, reqBody) => {
  //specify the properties of the doc to be updated
  let updatedCourse = {
    name: reqBody.name,
    description: reqBody.description,
    price: reqBody.price,
  };

  //findByIdAndUpdate(id, updatesToBeApplied) ---------------------------------------

  return Product.findByIdAndUpdate(productId, updatedCourse).then(
    (product, error) => {
      //course not updated
      if (error) {
        return false;
      } else {
        //course updated successfully
        return true;
      }
    }
  );
};

//Archive a course ---------------------------------------

module.exports.archiveProduct = (reqParams) => {
  //object

  let updateActiveField = {
    isActive: false,
  };

  return Course.findByIdAndUpdate(reqParams, updateActiveField).then(
    (course, error) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    }
  );
};
