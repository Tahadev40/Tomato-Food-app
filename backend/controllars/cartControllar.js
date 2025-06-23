import userModel from '../models/userModel.js';

// add item to user cart
const  addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1
        } else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.userId,{cartData});
        res.json({success:true,message:"added to cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

// remove items from use cart
const  removeFromCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0) {
        cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.userId,{cartData});
        res.json({success:true,message:"removed from cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"item not removed some error is find"})
    }
}

// fetch user cart data
const  getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData});
        }
        catch (error) {
        console.log(error);
        res.json({success:false,message:"error in fetching cart data"});
    }
}

export {addToCart, removeFromCart, getCart};