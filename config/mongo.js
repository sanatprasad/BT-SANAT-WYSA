const mongoose=require('mongoose');
const colors=require('colors');
const dotenv=require('dotenv');

dotenv.config();

const connectDB= async()=>{
    try{
        console.log(process.env.MONGO_URL)
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDb Connected ${mongoose.connection.host}`.bgGreen.white)
    }
    catch(error){
        console.log(`MongoDB Server Issue ${error}`.bgRed.white)
    }
};

module.exports=connectDB;
