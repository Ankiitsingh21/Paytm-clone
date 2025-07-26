const mongoose = require('mongoose');
// require('dotenv').config();
const {MONGODB_URL} = require("./serverConfig.js");

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = { connect };