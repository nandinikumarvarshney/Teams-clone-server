//Imported Mongoose
const mongoose = require('mongoose');

//Imported .env File, used for Dev deployment
require('dotenv').config();

//Initialize an array
let connection = {}

//To initialize the constants needed for Database connection while deploying on heroku
const MONGO_URL = "Enter your URL"
const MONGO_USER = 'Enter your Username'
const MONGO_PASS = encodeURIComponent(`Enter your Password`)

/* Description of the Function given below
   This Function is used to connect with the MongoDB cluster
*/ 
connection.getCollection = async () => {
    try {
        return (await mongoose.connect(MONGO_URL, {
            user: MONGO_USER, pass:MONGO_PASS,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
        }));
    } catch (error) {
        //console.log(error)
    }
}

// Exporting the connection array
module.exports = connection;