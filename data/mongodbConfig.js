const mongoose = require('mongoose')
const URI = process.env.MONGO_URI
module.exports = async () => {
    try{
        await mongoose.connect(URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("MongoDB Connected...")
    }catch(er){
        console.log(er)
    }
}