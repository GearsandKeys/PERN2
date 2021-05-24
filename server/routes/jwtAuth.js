const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// register route

router.post("/register", validInfo, async (req, res) => {
    try {
        //1. destructure the req.body (name, email, password)

        const { name, email, password } = req.body; //this assigns the 3 const to req.body.name and so on.

        //2. check if user exists (if user exist, throw error)

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length !== 0){
            //Then we would have a duplicate
            return res.status(401).send("User already exists."); //401 = Unauthenticated 403 = Unauthorized
        }

        //3. Bcrypt the user password

            const saltRound = 10; //How many times it will encrypt
            const salt = await bcrypt.genSalt(saltRound); //generates salt

            const bcryptPassword = await bcrypt.hash(password, salt); //this encrypts the password and generates hash, returned {} until I added await

        //4. enter the new user inside our database

            const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);

            //res.json(newUser.rows[0]);


        //5. generating our jwt token

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({token})


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Login Route

router.post("/login", validInfo, async (req, res) => {
    try {
        //1. Destructure the req.body

        const { email, password } = req.body; //don't need name for login

        //2. check if user exists, if not, throw an error

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if(user.rows.length === 0){
            return res.status(401).json("Password or Email is incorrect.");
        }

        //3. check if incoming password is same as DB password

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        //console.log(validPassword);
        
        if (!validPassword){
            return res.status(401).json("Password or Email is incorrect.");
        }

        //4. If meets all conditions, give JWT token using user_id so we can use it later
        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true); //If verified, then return true
    } catch (err) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;