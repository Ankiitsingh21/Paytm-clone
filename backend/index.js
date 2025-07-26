const express = require("express");
const cors = require('cors');
const apiRoutes= require("./routes/index.js");
const PORT = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api",apiRoutes);

app.listen(PORT,async()=>{
        console.log(`Server started at ${PORT}`)
});



