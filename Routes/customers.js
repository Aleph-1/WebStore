const express = require("express")
const router = express.Router();
const customerController = require('../Controller/Customer') //Controller API for using the mongoose methods
const customerService = require('../Services/customer');

router.get('/get',async (req,res)=>{
    const customers = await customerController.getCustomersByFilter({});
    res.render("../View/Customer/getCustomers",{customers})
})

router.get('/create',async (req,res)=>{
    const type = "guest";
    const user = null;
    const first = false;
    res.render("../View/LoginPage/register",{type,user,first})
})

router.route('/create').post(customerController.createCustomer)

router.route('/delete').get(function (req,res){
    customerController.deleteAllCustomers()
    res.redirect("/customers/get")
});
 
router.route('/update/:id').get(async (req,res)=>{
    const type =req.session.userType;
    const first = false;
    const customer = await customerController.getCustomerById(req,res);
    const user=customer;
    if(!customer){
        await res.json({message:"Not Found"})
        return;
    }

    custID = req.params.id
    res.render("../View/Customer/updateCustomer",{customer,type,user,first})
    
})

router.route('/update/:id').post(async (req,res)=>{
    customerController.updateAll(req,res);
    res.redirect('/buyPage');
})

router.get('/addresses',async (req,res)=>{
    let addresses = [];
    const customers = await customerController.getCustomersByFilter({});
    customers.forEach(c =>{
        addresses.push(c.address);
    })
    res.json(addresses);
})

function setCustomer(req,res,next){
    const userId = req.id;
}

module.exports = router
