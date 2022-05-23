const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  mobileNo: {
    type: String,
    required: [true, 'Mobile no. is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  addToCartItems: [
    {
      productId: {
        type: String,
        required: [true, 'Product ID is required'],
      },
      addedToCartOn: {
        type: Date,
        default: new Date(),
      },
      status: {
        type: String,
        default: 'For Checkout',
      },
    },
  ],
  // checkoutItems: [
  //   {
  //     productId: {
  //       type: String,
  //       required: [true, 'Product ID is required'],
  //     },
  //     enrolledOn: {
  //       type: Date,
  //       default: new Date(),
  //     },
  //     status: {
  //       type: String,
  //       default: 'Bought',
  //     },
  //   },
  // ],
});

module.exports = mongoose.model('User', userSchema);
