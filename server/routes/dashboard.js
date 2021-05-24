const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const { route } = require("./jwtAuth");

router.get("/", authorization, async (req, res) => {
    try {
        
        //req.user has the payload
        //res.json(req.user) //so now we see the req.user is the uuid assigned

        const user = await pool.query("SELECT user_name FROM users WHERE user_id=$1", [req.user]);

        //this displays whatever we queue above using the uuid, AKA don't display password
        res.json(user.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})




module.exports = router;