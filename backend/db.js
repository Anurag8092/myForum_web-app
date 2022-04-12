const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/myforumDB?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = () =>{
    mongoose.connect(mongoURI, () => {
        console.log("Connect to DB");
    });
}

module.exports = connectToMongo;