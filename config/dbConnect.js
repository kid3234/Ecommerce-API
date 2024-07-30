import mongoose from "mongoose";

mongoose.set('strictQuery', true);
const dbConnect = async () => {
  try {
    const connected = await mongoose.connect(process.env.DB_URL);
    console.log(`db connected ${connected.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect