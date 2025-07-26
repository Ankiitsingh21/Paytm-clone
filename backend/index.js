const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const {connect} = require("./config/db.js");
const apiRoutes= require("./routes/index.js");
// const { JWT } = require("./config/serverConfig.js");
const PORT = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api",apiRoutes);

app.listen(PORT,async()=>{
        // console.log(JWT);
        console.log(`Server started at ${PORT}`)
        await connect();
        console.log('MongoDb is connected');
});



