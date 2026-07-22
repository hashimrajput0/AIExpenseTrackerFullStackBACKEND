import mongoose from "mongoose";

async function ConnectDB() {

    try {
            await mongoose.connect(process.env.DB_URI)
            console.log("Connected to DB");
    } catch (err) {
        console.log("DATABASE IS NOT CONNECTED ERR  :" , err);
        res.status(500).json({
            message : `Database Connection Error ${err} `
        })
        
    }    
}

export default ConnectDB