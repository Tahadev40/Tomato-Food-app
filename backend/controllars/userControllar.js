 import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import validator from 'validator';

// login user
const loginUser = async (req,res) => {
    const {email,password,id} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false,massege:"user doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.json({success:false,massage:"invalid credentails"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,massage:"error"})
    }
}

// register user

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        // cheaking this user already exists
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false,message:"user already exists"});
        }
        // validating email and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"please enter a valid email"});
        }

        if (password.length<8) {
            return res.json({success:false, message:"please enter strong password"});
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword 
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,message:"user registered successfully",user,token});


    } catch (error) {
        console.log(error)
        res.json({success:false,message:"something went wrong, please try again later"});
    }
}

export { loginUser, registerUser, createToken };