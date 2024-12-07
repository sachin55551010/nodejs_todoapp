import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URL);
    console.log(`MongoDB is connected`);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};
