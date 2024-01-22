import colors from "colors";
import mongoose from "mongoose";

const ConnectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Conneted to MONGODB Database ${conn.connection.host}`.bgGreen.white)
    }catch(error){
        console.log(`MONGODB error: ${error}`)
    }
}

export default ConnectDB;