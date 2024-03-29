const express = require("express")
const router = express.Router();
const giftCardsController = require('../Controller/giftcard');
const giftCardsService = require('../Services/giftcard');
const customerService = require('../Services/customer');
const adminService = require('../Services/admin');

router.get('/', async (req,res)=>{
    
    const type =req.session.userType;
    const userID = req.session.user;
    let user=null;
    if(type=="customer"){
        user = await customerService.getCustomerById(userID);
    }
    else if(type=="admin"){
        user= await adminService.getAdminById(userID);
    }
    let isAdded=false;
    const first=false;
    let giftCards=[];
    
    giftCards=await giftCardsService.getGiftCards({isBought:false});
    
    res.render("../View/GiftCards/GiftCards",{type,giftCards,user,first,isAdded})
})

router.route('/create').post(async (req,res)=>{
    let Description = req.body.Description;
    let price = req.body.Amount;
    await giftCardsService.createGiftCard(price,Description,false);

    res.redirect('/giftCards')

})

router.get('/delete/:id',async (req,res)=>{
    let cardId = req.params.id;
    await giftCardsService.deleteGiftCardById(cardId);
})



router.get('/create',async (req,res)=>{
    const type =req.session.userType;
    const userID = req.session.user;
    let user=await adminService.getAdminById(userID);
    let isAdded=false;
    const first=false;
    res.render("../View/GiftCards/CreateCard",{type,user,first,isAdded})

});

router.route('/buy/:id').get(async (req,res)=>{
    
    let isAdded=false;
    const first=false;
    const type =req.session.userType;
    const userID = req.session.user;
    let user=null;
    if(type=="customer"){
        user = await customerService.getCustomerById(userID);
    }
    else if(type=="admin"){
        user= await adminService.getAdminById(userID);
    }
    let id=req.params.id;
    let giftCards=[];
    
    giftCards=await giftCardsService.getGiftCards({});
    let m = null;
    for(let i=0; i<giftCards.length;i++){
        if(giftCards[i].id===id){
            m=giftCards[i];
        }
    }
    let card=null;
    if(m!=null){
        card= await giftCardsService.createGiftCard(m.price,m.Description,true);
    }
    res.render("../View/GiftCards/CardPaid",{type,card,user,first,isAdded})
})

module.exports = router;