import express from 'express'
import { addToCart,removeFromCart,getCart } from '../controllars/cartControllar.js'
import authMiddleware from '../middleware/auth.js'

const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)

export default cartRouter;