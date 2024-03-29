const { request, response } = require("express");
const loginService = require("../../Services/LoginService/loginService");
const customerController = require('../customer');
const adminController = require('../admin');
const supplierController = require('../supplier');
const adminService = require('../../Services/admin')
const Customer = require("../../Model/Schemas/Customer");
const Admin = require("../../Model/Schemas/Admin");
const Supplier = require("../../Model/Schemas/Supplier");

function loginForm(req, res) { 
  const type = "guest";
  const user = null;
  const error = "";
  const first = false;
  res.render("../View/LoginPage/loginPage", {first,user,type,error}) 
}

async function login(req, res) {
    const { email, password } = req.body
    
    
    let result = await loginService.login(email,password);
    if(result== null){
      result="guest";
    }
    req.session.userType =result;
    req.session.isFirst=true;
    if (result == "customer") {
      const customer = await customerController.getCustomersByFilter({password: password,email: email});
      req.session.user = customer[0]._id;
      res.redirect("/homepage/");
    }
    else if (result == "admin") {
      const admin = await adminController.getAdminsByFilter({password: password,Email: email});
      req.session.user = admin[0]._id;
      res.redirect("/homepage/");
    }
    else if (result == "supplier") {
      const supplier = await supplierController.getSuppliersByFilter({password: password,email: email});
      req.session.user = supplier[0]._id;
      res.redirect("/homepage/");
    }
    else{
      const error = "Wrong password or email"
      const type = "guest";
      const user = null;
      const first = false;
      res.render("../View/LoginPage/loginPage", {first,user,type,error})     }
  }

  function logout(req, res) {
    req.session.destroy(() => {
      res.redirect("/homepage/");
    });
    
  }

  function registerForm(req,res){
  const type = "guest";
  const user = null;
  const first = false;
  const error = "";
  res.render("../View/LoginPage/register", {first,user,type,error}) 
  }

  function postNewUser(msg){
    
    fetch("https://graph.facebook.com/121786337504390/feed?message="+msg+"&access_token=EAAMkqB1d63MBAFv3VcY9KNrScTZAr28Tmp4ZCxSCeKVJKdo6a2w4LC5VjZA2jeMeCawN1OXcnzmWhG8JDkmzNmDm8nJZBMvPjMcrDf5DaAECvMvZCrOI3xgoYhf00ZCnUROY89MTKdeYHci3znf5uUCyg4qw4R24ArSDbym0WuSklbS5ZCNU9ch8mrpqrnTlpAZD",
    {method:'POST'})
   .then(resp=>resp.json()).then(data=>console.log(data)) // Debug print
  }


  async function register(req,res){
    const customer = req.body.customer;
    if(( await Customer.findOne({email: req.body.email}) != null) || (await Customer.findOne({email: req.body.email}) != null) || (await Customer.findOne({email: req.body.email}) != null)){
      const type = "guest";
      const user = null;
      const first = false;
      const error = "Look like this email is already used";
      res.render("../View/LoginPage/register", {first,user,type,error}) 
    }else{
    if(customer == 'on'){
      postNewUser("Welcome Our Newest Customer "+req.body.firstName)
      customerController.createCustomer(req,res);
    }else{
      postNewUser("Welcome To Our Family Of Suppliers "+req.body.firstName)
      supplierController.createSupplier(req,res);
    }
    res.redirect('/login')
    }
  }

  function createAdmin(req,res){
    adminController.createAdmin1Privilage(req,res);
    res.redirect('/login/createAdmin')
  }

  async function adminPage(req,res){

      const type = "admin";
      const userId = req.session.user;
      const user = await adminService.getAdminById(userId);
      const first = false;
      res.render("../View/Admin/createAdmin", {first,user,type})  
  }



  module.exports = {
    login,
    loginForm,
    logout,
    registerForm,
    register,
    createAdmin,
    adminPage
  }