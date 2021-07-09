const userController = require('../controller/userController.js')
const validator = require('../validator/validator.js')
const bcrypt = require('bcryptjs')


let userService = {}


//login
userService.login = async (loginDetails) => {
    let { error, isValid } = validator.login(loginDetails);
    if (!isValid) {
        throw error
    } else {
        let response = await userController.login(loginDetails.email);
        if (!response) {
            let err = new Error("Email Not Found")
            err.status = 401
            throw err
        }
        let isMatch = await bcrypt.compare(loginDetails.password, response.password)
        if (isMatch) {
            return true;
        } else {
            let err = new Error("Password is Incorrect")
            err.status = 401
            throw err
        }
    }

};


//register
userService.register = async (registerDetails) => {
    let { error, isValid } = validator.register(registerDetails);
    if (!isValid) {
        throw error
    } else {
        let response = await userController.register(registerDetails);
        if (response.email === registerDetails.email) {
            let err = new Error("User already  exists")
            err.status = 406
            throw err
        } else {
            return true;
        }
    }

};


module.exports = userService;