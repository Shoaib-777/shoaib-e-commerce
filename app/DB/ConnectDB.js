// import mongoose from "mongoose";

// export default async function ConnectDB(){
//     try {
//     mongoose.connect(process.env.MONGO)
//     console.log("connected to db shoaib bhai")
//     } catch (err) {
//         console.log("failed to connect",err)
//     }
// }

import mongoose from "mongoose";

export default async function ConnectDB() {
  if (mongoose.connection.readyState === 1) {
    // 1 means connected
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to db shoaib bhai");
  } catch (err) {
    console.log("Failed to connect", err);
  }
}
