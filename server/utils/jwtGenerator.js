const jwt = require("jsonwebtoken");
require('dotenv').config(); //Allows access to all env variables



function jwtGenerator(user_id){
    const payload = {
        user: user_id
    }
    
    //sign the token
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"})
}

module.exports = jwtGenerator;