const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Models = require("./models");
const cors = require("cors");

const Order = require("./models");

const app = express();

// Use CORS
app.use(cors());

// For local MongoDB
mongoose.connect("mongodb://localhost:27017/orders", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 Middleware function; 
 when the client sends data to the server,
 the data is usually in the request body.
 For the server to convert the data, it needs to
 convert the format of the data to JSON.
 */
app.use(bodyParser.json());

// get all orders
app.get("/orders", async (req, res) => {
  await Order.find()
    .then((orders) => {
      res.status(201).json(orders);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// add new order
app.post("/orders", async (req, res) => {
  console.log(req.body);

  const receiver = {
    Name: req.body.fullName,
    Address: req.body.address,
    PostalCode: req.body.postalCode,
    City: req.body.city,
    Phone: req.body.phone,
    Email: req.body.email,
  };

  const payment = req.body.payment;

  // console.log(receiver);

  const total = req.body.getSumOfCart;
  // console.log(total)

  const items = req.body.shoppingCart;

  await Order.create({
    Item: items,
    Payment: payment,
    Total: total,
    Receiver: receiver,
  })
    .then((order) => {
      console.log("Order created: ", order);
      res.status(201).json(order);
    })
    .catch((error) => {
      console.log("Error: ", error);
      // res.status(500).json("Error: " + error);
    });
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
