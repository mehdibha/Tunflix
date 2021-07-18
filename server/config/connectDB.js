import mongoose from "mongoose"
import config from '.'

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri, config.mongoOptions);
        console.log("The DB is connected");
    } catch (error) {
        console.log('DB connection error :' , error);
    }
};

export default connectDB;
