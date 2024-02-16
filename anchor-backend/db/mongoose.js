import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('🍀 MongoDB connected successfully 🍀');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // You can add additional error handling logic here if needed
  }
};

export default connectToDatabase;
