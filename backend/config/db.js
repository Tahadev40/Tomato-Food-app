import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://tahakhan:8796868868@cluster0.oztmspo.mongodb.net/food-app').then(()=>console.log("DB Connect"));
}