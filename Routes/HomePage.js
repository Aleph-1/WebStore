const express = require("express")
const router = express.Router();
const customerController = require('../Controller/customer');
const adminController = require('../Controller/admin');
const supplierController = require('../Controller/supplier');


router.get('/',async (req,res)=>{
    res.render("../View/HomePage/HomePage")
})

router.get('/customer/:id',async (req,res)=>{
    const user = await customerController.getCustomerById(req,res);
    if(!user){
        await res.json({message:"Not Found"})
        return;
    }

    id = req.params.id
    res.render("../View/HomePage/HomePageCustomer",{id,user})
})

router.get('/admin/:id',async (req,res)=>{
    const user = await adminController.getAdminById(req,res);
    if(!user){
        await res.json({message:"Not Found"})
        return;
    }

    id = req.params.id
    res.render("../View/HomePage/HomePageAdmin",{id,user})
})

router.get('/supplier/:id',async (req,res)=>{
    const user = await supplierController.getSupplierById(req,res);
    if(!user){
        await res.json({message:"Not Found"})
        return;
    }

    id = req.params.id
    res.render("../View/HomePage/HomePageSupplier",{id,user})
})

router.post('/',async (req,res)=>{
    const products = await productController.getProductsByFilter({});
    res.render("../View/StorePage/StorePage",{products})
})

module.exports = router;