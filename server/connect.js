import mongoose from "mongoose";

const ConnectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected Successfully")

    } catch(error)
    {
        console.log("MongoDB Error",error)
    }
}
export default ConnectDB