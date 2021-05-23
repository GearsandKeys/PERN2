const jwt = require('jsonwebtoken');
require("dotenv").config(); //goes into our .env for the secret

//this middleware will continue on if the token is inside the local storage

module.exports = async (req, res, next) => {
    try {
        //1. Destructure token
        const jwtToken = req.header("token");

        //Check if they have a token
        if(!jwtToken){
            return res.status(403).json("Not Authorized.");
        }

        // Check if token is fake
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        req.user = payload.user;

        next(); //If the response takes forever, could be because your middleware is missing the next();
    } catch (err) {
        console.error(err.message)
        return res.status(403).json("Not Authorized.");
    }
}