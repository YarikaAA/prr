// Database Configuration

// Dotenv package to enable environment variables in .env
require("dotenv").config();

const harperive = require("harperive");

// connection object to harperdb
const DB_CONFIG = {
  harperHost: process.env.INSTANCE_URL,
  username: process.env.INSTANCE_USERNAME,
  password: process.env.INSTANCE_PASSWORD,
  schema: process.env.INSTANCE_SCHEMA // Optional -but only one schema for now
};

const Client = harperive.Client;

try {
  // New instance of harperive
  const client = new Client(DB_CONFIG);
}catch (e){
  console.log(e)
}

const client = new Client(DB_CONFIG);

module.exports = client;
