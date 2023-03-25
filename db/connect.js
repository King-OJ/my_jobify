import mongoose from "mongoose";

export default async function connectDB(url){
    await mongoose.connect(url)
    console.log('db connected');
}