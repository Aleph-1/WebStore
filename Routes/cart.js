const express = require("express")
const router = express.Router();
const productController = require('../Controller/product')
const cartController = require('../Controller/customer')


router.get('/:id',async (req,res)=>{
   /* const Product = await productController.getProducts(req,res);
    if(!Product){
        await res.json({message:"Not Found"})
        return;
    }

    const customer = await (cartController.getCustomerById(req,res));
    const products=customer.shoppingCart

    await res.render("../View/Cart/CartM",{products,Product})*/

    const customer = await (cartController.getCustomerById(req,res));
    const products=customer.shoppingCart
    const id=req.params.id

    const allProducts = await productController.getProductsByFilter({});

    let finalProducts=[]

    for(let i=0;i<allProducts.length;i++){
        if(products.includes(allProducts[i]._id)){
            if(!finalProducts.includes(allProducts[i])){
                finalProducts.push(allProducts[i]);
            }
        }
    }
    res.render("../View/Cart/CartM",{finalProducts,id})
})

module.exports = router