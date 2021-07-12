//Imported isEmpty and validator libraries
const Validator = require('validator')
const isEmpty = require('is-empty');

let validator = {};

 validator.login = (loginDetails) => {

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    loginDetails.email = !isEmpty(loginDetails.email) ? loginDetails.email : "";
    loginDetails.password = !isEmpty(loginDetails.password) ? loginDetails.password : "";

    // Email checks
    if (Validator.isEmpty(loginDetails.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(loginDetails.email)) {
        errors.email = "Email is invalid";
    }
    // Password checks
    if (Validator.isEmpty(loginDetails.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
 
validator.register = (registerDetails) => {

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    registerDetails.email = !isEmpty(registerDetails.email) ? registerDetails.email : "";
    registerDetails.password = !isEmpty(registerDetails.password) ? registerDetails.password : "";

    // Email checks
    if (Validator.isEmpty(registerDetails.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(registerDetails.email)) {
        errors.email = "Email is invalid";
    }
    // Password checks
    if (Validator.isEmpty(registerDetails.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validator;