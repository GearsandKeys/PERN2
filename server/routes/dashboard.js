const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const { route } = require("./jwtAuth");

router.get("/", authorization, async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})




module.exports = router;