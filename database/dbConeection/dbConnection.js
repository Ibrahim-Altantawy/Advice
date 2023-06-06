import mongoose from "mongoose";

const  dbConnection = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`)
      
    } catch (error) {
        console.log(error)
        
    }
}
export default dbConnection;