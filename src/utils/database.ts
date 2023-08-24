import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);
    if (isConnected) {
        console.log("MongoDb is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: "next_prompts",
        });
        isConnected = true;
        console.log("MongoDB connected");
    } catch (e) {
        console.log(e);
    }
};
