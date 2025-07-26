const dotenv = require('dotenv');

dotenv.config();

module.exports={
        MONGODB_URL: process.env.mongodb_url,
}