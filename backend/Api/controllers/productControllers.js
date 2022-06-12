const Product = require('../models/Product');

// CREATE A PRODUCT (ADMIN ONLY) -----------------------------------------------------------------------------
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

// DELETE A PRODUCT (ADMIN ONLY) -----------------------------------------------------------------------------
module.exports.deleteProduct = (productId) => {
  return Product.findByIdAndDelete(productId).then((result) => {
    return result ? true : false;
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

//Retrieve SPECIFIC product ---------------------------------------

module.exports.getProduct = (reqParams) => {
  return Product.findById(reqParams).then((result) => {
    return result;
  });
};

//Update a Product ---------------------------------------

module.exports.updateProduct = (productId, reqBody) => {
  //specify the properties of the doc to be updated
  let updatedProduct = {
    name: reqBody.name,
    description: reqBody.description,
    price: reqBody.price,
  };

  //findByIdAndUpdate(id, updatesToBeApplied) ---------------------------------------

  return Product.findByIdAndUpdate(productId, updatedProduct).then(
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

  return Product.findByIdAndUpdate(reqParams, updateActiveField).then(
    (Product, error) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    }
  );
};

//unArchive a Product ---------------------------------------
module.exports.unarchiveProduct = (reqParams) => {
  //object

  let updateActiveField = {
    isActive: true,
  };

  return Product.findByIdAndUpdate(reqParams, updateActiveField).then(
    (Product, error) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    }
  );
};
