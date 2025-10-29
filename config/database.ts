import mongoose from 'mongoose';

let connected = false;

const connectDb = async () => {
  mongoose.set('strictQuery', true);

  if (connected) {
    console.log('Already connected to DB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    connected = true;
  } catch (err: unknown) {
    console.error(err);
  }
};

export default connectDb;
