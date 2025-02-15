import mongoose from "mongoose";

const connectDB = async() =>{
    await mongoose.connect(
      "mongodb+srv://ravurusaikishore:SatwikPranayKishore@cluster0.kwj61.mongodb.net/prescripto"
    ).then(() => console.log('DB is Connected'));
}

export default connectDB