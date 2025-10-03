import mongoose from "mongoose"

export default async function ConnectDB() {
    if (mongoose.connection.readyState === 1) {
        console.log("Already connected to DB");
        return;
    }
    try {
        await mongoose.connect(process.env.URI)
        console.log("connected to database")
    } catch (error) {
        console.error("error connecting to database", error)
    }
}