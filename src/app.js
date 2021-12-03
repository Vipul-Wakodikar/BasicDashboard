const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 5000;
require("./db/conn");
const Register = require("./models/register");
const Productadmin = require("./models/productadmin");
const { urlencoded } = require('express');

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(urlencoded({extended: false}));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);

app.get('/',(req,res)=>{
    res.render("login");
})
app.get("/api/random", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
app.get('/api',(req,res)=>{
    Productadmin.find({})
    .exec((err,data)=>{
        if(err){
            console.log(err)
            return;
        }else{
            res.json(data);
            return;
        }
    })
})
//Register code 
app.get('/register',(req,res)=>{
    res.render("register");
})

app.post('/register',async (req,res)=>{
    try{
        const password = req.body.password;
        const conpassword = req.body.confirmpassword;
        const role = req.body.role;
        if(password === conpassword){
           const registerEmployee = new Register({
               username: req.body.username,
               password: password,
               confirmpassword: conpassword,
               role: role
           })
          const registered =  await registerEmployee.save();
          res.status(201).render("index");
        }
        else{
            res.send('Password not match');
        }
    }
    catch(e){
        res.status(400).send('User already exist');
    }
})
//productlist------------------------------------------------------------
app.get('/login/admin',(req,res)=>{
    res.render("welcomeadmin");
})

app.post('/login/admin',async (req,res)=>{
    try{
        const role = req.body.role;
        console.log(role);
        // if(role === "admin"){
            console.log(req.body.product);
           const productList = new Productadmin({
               product: req.body.product,
               price: req.body.price,
               avatar: req.body.avatar,
           })
          const productregistered =  await productList.save();
          res.status(201).render("welcomeadmin");
        // }
        // else{
        //     console.log('Not Authorized ಠ_ಠ')
        // }
    }
    catch(e){
        res.status(400).send(e);
    }
})

//------------------------------------------------------------------------
app.get('/login', (req,res)=>{
    res.render("login");
})
app.get('/login/admin', (req,res)=>{
    res.render("welcomeadmin");
})
app.get('/login/user', (req,res)=>{
    res.render("welcomeuser");
})
app.post('/login',async (req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const getusername = await Register.findOne({username: username});
        if(getusername.password === password && getusername.role === "admin"){
            res.status(201).redirect('login/admin').render("welcomeadmin");
        }
        else if(getusername.password === password && getusername.role === "moderator"){
            res.status(201).render("welcomemoderator");
        }
        else if(getusername.password === password && getusername.role === "user"){
            res.status(201).redirect('login/user').render("welcomeuser");
        }
    }
    catch(e){
        res.status(400).send('invalid username or password');
    }
})

app.listen(port,()=>{
    console.log(`port is running at ${port}`);
})