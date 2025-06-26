import mongoose from "mongoose";

export const connectDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected");
    
  } catch (error) {
    console.log("Error in connecting to MongoDB", error);
    process.exit(1);
  }
}