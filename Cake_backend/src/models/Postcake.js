const mongoose = require("mongoose");


const cakes = new mongoose.Schema({

    Cake_Name:{
        type:String,
        required:true
    },
    Shopkeeper_name:{
        type:String,
        require:true
    },
  
    Shop_name:{
        type:String,
        require:true
    },
  
    Mobile_no:{
        type:Number,
        require:true
    },
   
    Cake_description:{
        type:String,
        required:true
    },
  
    Price: {
        type:Number,
        required:true
    },
    Flavour:{
       type: String,
      required:true
    },
    Weight:{
        type:String,
        required:true
     },
     Image_Link:{
      type:String,
      required:true
     },
     Category:{
      type:String,
      required:true
  },
  })
  
  
  
  // //we need to create collections
  const Newcakes = new mongoose.model("Newcakes",cakes);
  module.exports = Newcakes;