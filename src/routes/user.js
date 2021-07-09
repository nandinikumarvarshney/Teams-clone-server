const express = require('express');
const userRoutes = express.Router();
const userService = require('../service/user');
const jwt = require("jsonwebtoken")
const secret = "vnefovnepojvnoen@@E#I(RINN@!_)Q~#@INFN{)B$*~N!Q#RF{)~@falseF_@!JF(q#rf)}}ONFPION$PIFNI(!@((I@#P("
require('dotenv').config()

// TODO : login into the accounts   /* http://localhost:8080/users/register/Data */
userRoutes.post('/login', async (req, res, next) => {
    try {
        let loginDetails = await req.body;
        let response = await userService.login(loginDetails);
        if (response) {
            // User matched
            // Create JWT Payload
            const payload = {
                email: loginDetails.email
            };
            // Sign token
            jwt.sign(
                payload,
                secret,
                {
                    expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                    if(token){
                        res.json({
                            success: true,
                            token: "Bearer" + token
                        });
                    }
                    else{
                        res.json({ message:err})
                    }
                })
        }
    } catch (error) {
        next(error);
    }
});

//register
userRoutes.post('/register', async (req, res, next) => {
    try {
        let registerDetails = await req.body;
        let response = await userService.register(registerDetails);
        if (response) {
            res.status(200)
            res.json({ message: "Account Created Successfully" })
        }
    } catch (error) {
        next(error);
    }
});




module.exports = userRoutes;