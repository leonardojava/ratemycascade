import mongoose from "mongoose";
export const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
            socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
        });
    } catch (error){
        console.log("Error connecting to MongoDB", error);
    }
};