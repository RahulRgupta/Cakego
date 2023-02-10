
const express = require("express");
const app = express();
let multer = require('multer')
const path = require("path");
const hbs = require("hbs");
const mongoose = require("mongoose");

require("./db/conn");
const Register = require("./models/register");
const NewCakes = require("./models/admin_page");

const { json } = require("express");

const port = process.env.port || 7000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

//Storage Setting
let storage = multer.diskStorage({
  destination: './public/uploads', //directory (folder) setting
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname) // file name setting
  }
})

//Upload Setting
let upload = multer({
  storage: storage
})

var imgModel = require('./models/admin_page');
const { fstat } = require("fs");

//home page
app.get("/", (req, res) => {
  res.render("Home");
});

//admin page
app.get("/admin_login", (req, res) => {
  res.render("admin_login");
})

//userlogin page
app.get("/Userlogin", (req, res) => {
  res.render("Userlogin");

})

//register page
app.get("/register", (req, res) => {
  res.render("register");

})

//admin page
app.get("/admin_page", (req, res) => {
  res.render("admin_page");
})

//cart page 2
app.get("/cart-2", (req, res) => {
  res.render("cart-2");
})

//add to cart page
app.get("/addtocart", (req, res) => {
  res.render("addtocart");
})

//cart pag 5
app.get("/cart-5", (req, res) => {
  res.render("cart-5");
})

//cart pag 6
app.get("/cart-6", (req, res) => {
  res.render("cart-6");
})

//cart pag 7
app.get("/cart-7", (req, res) => {
  res.render("cart-7");
})

//cart pag 8
app.get("/cart-8", (req, res) => {
  res.render("cart-8");
})


app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const registeremployee = new Register({
        Name: req.body.Name,
        email: req.body.email,
        password: password,
        //confirmpassword:cpassword
      })

      const registed = await registeremployee.save();
      res.status(201).render("Home");

    } else {
      res.send("invalid details")
    }

  } catch (error) {
    res.status(400).send(error);
  }
})


app.post("/Userlogin", async (req, res) => {

  try {
    const email = req.body.email;
    const password = req.body.psd;

    const useremail = await Register.findOne({ email: email });

    if (useremail.password === password) {
      res.status(201).render("addcart")


    } else {
      res.send("invalid login details");
    }
  }
  catch {
    res.status(400).send("invalid email")
  }

})

const userOrders = new mongoose.Schema({
  CakeName: {
    type: String,
    // required: true
  },
  CakePrice: {
    type: String,
    //required: true
  },
  CakeQuantity: {
    type: String,
    //required: true
  },

  Customer_Name: {
    type: String,
    //required: true
  },

  Customer_Phoneno: {
    type: Number,
   // required: true
  },
  Customer_Address: {
    type: String,
   // required: true
  },
  Customer_custommsg: {
    type: String,
   // required: true
  },


})

//we need to create collections
const Orders = new mongoose.model("Orders", userOrders);

app.post("/addtocart", upload.single('single_input'), (req, res, next) => {
  // req.file
  // NewCakes.create({Cake_Image:req.file.filename})
  try {
    const aname = "admin";
    const password = "admin";

    // const useremail = await  Register.findOne({email:email});

    if (aname === password) {
      //res.status(201).render("addcart")
      //console.log("ad");
      const custdetails = new Orders({
        CakeName: req.body.user_title,
        CakePrice: req.body.user_price,
        CakeQuantity: req.body.user_quantity,
        Customer_Name: req.body.yourname,
        Customer_Phoneno: req.body.phonumber,
        Customer_Address: req.body.addressbar,
        Customer_custommsg: req.body.custonn,

        //confirmpassword:cpassword
      })

      const added = custdetails.save();
      res.status(201).render("addtocart");

    } else {
      res.send("invalid details");
    }
  }
  catch (error) {
    res.status(400).send(error);
  }

})

app.post("/admin_page", upload.single('single_input'), (req, res, next) => {
  // req.file
  // NewCakes.create({Cake_Image:req.file.filename})
  try {
    const aname = "admin";
    const password = "admin";

    // const useremail = await  Register.findOne({email:email});

    if (aname === password) {
      //res.status(201).render("addcart")
      //console.log("ad");
      const cdetails = new NewCakes({
        Cake_Name: req.body.c_name,
        Cake_description: req.body.cake_desc,
        Price: req.body.price,
        Flavour: req.body.flav,
        Weight: req.body.wght,
        Category: req.body.cake_category,
        Shopkeeper_Name: req.body.s_name,
        Shop_Name: req.body.shop_name,
        Shop_Mobile: req.body.s_mob,
        Cake_Image_Link: req.body.img_url
        //confirmpassword:cpassword
      })

      const added = cdetails.save();
      res.status(201).render("admin_page");

    } else {
      res.send("invalid details");
    }
  }
  catch (error) {
    res.status(400).send(error);
  }

})




app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
})