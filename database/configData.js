import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()



const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.mongoConnectionString);
        console.log("MongoDB connected successfully") 
    }
    catch{
        console.log("Error connecting to MongoDB:", error.message);
    }
}


export default connectDB