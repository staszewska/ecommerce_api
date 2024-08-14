const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Models = require("./models");

const Order = Models.Order;

const uuid = require("uuid");

const app = express();

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

let orders = [];

// add new order
app.post("/orders", (req, res) => {
  let newOrder = req.body;

  //check if "Item" is present in the requested body
  if (!newOrder.Item) {
    const message = 'Missing "Item" in request body';
    res.status(400).send(message);
  } else {
    //add unique ID to the order
    newOrder.id = uuid.v4();
    orders.push(newOrder);
    res.status(201).send(newOrder);
  }
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
