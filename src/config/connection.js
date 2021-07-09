const mongoose = require('mongoose');
require('dotenv').config();

let connection = {}

const MONGO_URL = "mongodb+srv://user:pass@clusterteamsclone.zvgx8.mongodb.net/clusterteamsclone?retryWrites=true&w=majority"
const MONGO_USER = 'Nandini'
const MONGO_PASS = encodeURIComponent(`Pixie001`)

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

module.exports = connection;