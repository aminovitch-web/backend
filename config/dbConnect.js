const { default : mongoose } = require("mongoose");

const urimongo = process.env.MONGODB_URI;
const dbConnect = () => {
     try{
        const conn = mongoose.connect(urimongo);
        console.log("succes connected to database")
     }
     catch(error){
       console.log("error database connection");
     }
}
module.exports = dbConnect;