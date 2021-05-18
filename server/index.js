const express = require('express');
const app = express();
const cors = require("cors");

//middleware

app.use(express.json()); //req.body
app.use(cors()); //run CORS cross-origin resource sharing so they can talk

//ROUTES//

//register and login routes

app.use("/auth", require("./routes/jwtAuth"));


app.listen(5000, () => {
    console.log('Server is running...')
});