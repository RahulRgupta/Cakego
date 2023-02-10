
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
app.set('view engine', 'ejs')
require("./db/conn");
const mongoose = require("mongoose");
const Register = require("./models/register");
const Newcakes = require("./models/Postcake");
const Orders = require("./models/cart_item");

const { json } = require("express");
const multer = require("multer");
const { link } = require("fs");

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


//home page
app.get("/", (req, res) => {
  res.render("Home")
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

//cart pag 3
app.get("/cart-3", (req, res) => {
  res.render("cart-3");
})

//cart pag 4
app.get("/cart-4", (req, res) => {
  res.render("cart-4");
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
app.get("/index", (req, res) => {
  res.render("index");
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


///////////////////


// let myschema = mongoose.Schema({
  
//   Picture: String,
  

// })



// let mymodel = new mongoose.model('user', myschema)
//postcake
app.post("/admin", async (req, res) => {

  try {
    const aname = "admin";
    const password = "admin";

    
    if (aname === password) {
      
      
      const cdetails = new Newcakes({
        Cake_Name: req.body.c_name,
        Cake_description: req.body.cake_desc,
        Price: req.body.price,
        Flavour: req.body.flav,
        Mobile_no:req.body.Mobile,
        Shopkeeper_name:req.body.S_name,
        Shop_name:req.body.Shop,
        Weight: req.body.wght,
        Category: req.body.cake_category,
        Image_Link:req.body.link
        
      })

      const added = await cdetails.save();
      
      res.status(201).render("admin_page");

    } else {
      res.send("invalid details");
    }
  }
  catch (error) {
    res.status(400).send(error);
  }

})

//orderitem
app.post("/order",async(req, res) => {
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
        CakeName: req.body.cart-item,
        CakePrice: req.body.cart-price,
        CakeQuantity: req.body.cart-quantity,
        Customer_Name: req.body.name,
        Customer_Phoneno: req.body.pno,
        Customer_Address: req.body.add,
        Customer_custommsg: req.body.msg,

        //confirmpassword:cpassword
      })

      const added =await custdetails.save();
      res.status(201).render("cart-2");

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