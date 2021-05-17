const express = require('express');
const app = express();

//middleware

app.use(express.json()); //req.body
app.use(cors()); //run CORS cross-origin resource sharing so they can talk

//ROUTES//



app.listen(5000, () => {
    console.log('Server is running...')
});