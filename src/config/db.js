import { MongoClient } from "mongodb";
// Replace the uri string with your connection string.
// Create a connection string

import Database_mongo from "./config_name.js"

const connectionString = Database_mongo.mongdb_host + Database_mongo.database_name;
// Create a MongoClient object
const client = new MongoClient(connectionString);

// Connect to the database
let db = client.connect((err) => {
    // Check for errors
    if (err) {
        console.log(err);
        return;
    }

    // The database is connected
    console.log("Connected to the database");
});

export default db;