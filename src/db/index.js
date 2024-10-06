// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";


// const connectDB = async () => {
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
//         console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
//     } catch (error) {
//         console.log("MONGODB connection FAILED ", error);
//         process.exit(1)
//     }
// }

// export default connectDB

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`, {
            // useNewUrlParser: true,             // Use new URL parser
            // useUnifiedTopology: true,          // Use the new server discovery and monitoring engine
            serverSelectionTimeoutMS: 5000,    // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000,            // Close sockets after 45 seconds of inactivity
            connectTimeoutMS: 10000,           // Connection timeout of 10 seconds
            // keepAlive: true                    // Keeps the connection alive
        });
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED: ", error.message);
        process.exit(1); // Exit process if connection fails
    }
};

export default connectDB;
