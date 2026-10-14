import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DbConnection = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connection successfull.");
    }catch(error){
        console.log("MongoDb connection error",error);
    }
};

export default DbConnection;


