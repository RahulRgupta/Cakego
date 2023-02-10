const mongoose = require("mongoose");

const userorders = new mongoose.Schema({
    CakeName: {
      type: String,
       //required: true
    },
    CakePrice: {
      type: String,
     // required: true
    },
    CakeQuantity: {
      type: String,
     // required: true
    },
  
    Customer_Name: {
      type: String,
      //required: true
    },
  
    Customer_Phoneno: {
      type: Number,
      //required: true
    },
    Customer_Address: {
      type: String,
      //required: true
    },
    Customer_custommsg: {
      type: String,
      //required: true
    },
  
  
  })
  
  //we need to create collections
  const Orders = new mongoose.model("Orders", userorders);
  
  module.exports = Orders;