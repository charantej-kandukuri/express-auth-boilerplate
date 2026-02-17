import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    console.log('Connected to the database');
    try {
        await mongoose.connect(process.env.MONGO_URI!)
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
}

export default connectDB;