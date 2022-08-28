const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
      minLength: [10, "Number Must be of 10 digits"],
      maxLength: [10, "Number Must be of 10 digits"],
    }
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      desc:{
        type: String,
        required : [true, "Descreption of the product is requires"]
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        }
      }
    }
  ],
  by:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  taxPrice: {
    type: Number,
    required: true,
  },
  shippingPrice: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model("Order", schema);
