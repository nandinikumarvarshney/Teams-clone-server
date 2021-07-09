const connection = require('../config/connection.js')
const User = require('../model/user.model.js')
const bcrypt = require('bcryptjs');

createConnection = async () => {
    connection.getCollection();
}

let userController = {};

userController.register = async (registerDetails) => {

    //generate new password
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(registerDetails.password, salt);

    let response = await User.findOne({ email: registerDetails.email }, { _id: 0, email: 1 })
    if (response) {
         return response
    } else {
        //create new user
        const newUser = new User({
            firstname: registerDetails.firstname,
            middlename: registerDetails.middlename,
            lastname: registerDetails.lastname,
            password: hashedPassword,
            organisation: registerDetails.organisation,
            location: registerDetails.location,
            position: registerDetails.position,
            email: registerDetails.email,
            phone: registerDetails.phone
        });

        //save user and respond
        const user = await newUser.save(); 
        if (user) {
            return true;
        }
        else {
            return false
        }
    }
}



userController.login = async (email) => {
    let user = await User.findOne({ email: email }, { _id: 0, email: 1, password: 1 });
    if (user) {
        return user;
    } else {
        return null;
    }
}
createConnection()
module.exports = userController