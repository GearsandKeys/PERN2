const router = require("express").Router();
const pool = require("../db");
// registering

router.post("/register", async (req, res) => {
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
            const salt = await bcrypt.genSalt(saltRound);

            const bcryptPassword = bcrypt.hash(password, salt);

        //4. enter the new user inside our database

            const newUser = await pool.query("INSERT INTO user ")
        //5. generating our jwt token



    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});


module.exports = router;