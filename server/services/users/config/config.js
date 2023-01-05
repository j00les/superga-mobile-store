const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URL
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ddohxlc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

let connection;

async function run() {
  try {
    await client.connect();

    console.log('Connected successfully to server');

    const db = client.db('superga-DB');
    connection = db;
  } catch (err) {
    console.log(err);
  }
}

function runConnection() {
  return connection;
}

module.exports = { run, runConnection };
