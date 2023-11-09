const router = require('express')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const route = router()
const controller = require('../controller/controller')
const usercontroller = require('../controller/userdetail')
const productController = require('../controller/product.js')
const {response} = require('../middleware/response')
const UserModel = require('../model/User')
const auth = require('../middleware/auth')

route.get("/", (req, res) => {
  res.status(200).json({ message: "ProductRoute is working" });
});

route.post('/add',controller.add)
route.put("/update/:_id", controller.update)
route.delete('/delete/:_id', controller.delete)
route.get('/getbyId/:_id',controller.byId)
route.get('/getAll',controller.getAll)
//user routes
route.get('/getAlluser',auth,usercontroller.getAll)
route.post('/adduser',auth,usercontroller.add)
route.get('/getUserbyId/:_id',usercontroller.getbyId)
route.put('/updateuser/:_id',usercontroller.update)

//product routes :-
route.post('/addProduct',auth,productController.AddProduct)
route.get('/getAllProducts',auth,productController.getAllProducts)
route.get('/getProductBYId/:_id',productController.getProductBYId)
route.delete('/delteProductByID/:_id',productController.deleteProductByID)
route.get('/getAllSearch',auth,productController.getAllSearch)
route.put('/updateProduct/:_id',productController.updateProduct)
//login && registration
route.post("/register", async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;
  
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }
      const oldUser = await UserModel.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      encryptedPassword = await bcrypt.hash(password, 10);
  
      const user = await UserModel.create({
        first_name,
        last_name,
        email: email.toLowerCase(), 
        password: encryptedPassword,
      });
  
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      if(user){
        return response("Success!!", {}, 200, res);
      }else{
        return response("data not added!!", {}, 404, res);
      }
    } catch (err) {
      console.log("err",err);
      return response("something went wrong!!", {}, 500, res);
    }

  });
route.post("/login", async (req, res) => {
    try {
     
      // const { email, password } = req.decoded;
      const { email, password } = req.body;
  
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      
      const user = await UserModel.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
       
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
    
        user.token = token;
  
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  
  });

  route.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });
module.exports = route