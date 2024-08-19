const mongoose = require("mongoose");

let receiverSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    PostalCode: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
    },
  },
  { _id: false }
);

let orderSchema = new mongoose.Schema({
  Item: {
    type: [Object], // array of objects
    required: true,
  },
  Payment: {
    type: String,
    required: true,
  },
  Total: {
    type: Number,
    required: true,
  },
  Receiver: {
    type: receiverSchema,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
