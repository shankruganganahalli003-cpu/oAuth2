const mongoose = require("mongoose");


const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGOURI)
    .then(()=>{
        console.log("connected")
    }).catch((err)=>{
        console.log(err.message);
    });
}

module.exports = connectDB;
