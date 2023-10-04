import { MongoClient } from 'mongodb';
/*
contains the class DBClient.
DBClient should have:
the constructor that creates a client to MongoDB:
host: from the environment variable DB_HOST
or default: localhost
port: from the environment variable DB_PORT
or default: 27017
database: from the environment variable DB_DATABASE
or default: files_manager
a function isAlive that
returns true when the connection to MongoDB is a success
otherwise, false
an asynchronous function nbUsers that
returns the number of documents in the collection users
an asynchronous function nbFiles that
returns the number of documents in the collection files
After the class definition,
create and export an instance of DBClient called dbClient.
*/

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect()
      .then(() => {
        this.db = this.client.db(DB_DATABASE);
        this.users = this.db.collection('users');
        this.files = this.db.collection('files');
      })
      .catch((err) => {
        this.db = false;
        console.log(err.message);
      });
  }

  isAlive() {
    return this.client.topology.isConnected();
  }

  async nbUsers() {
    return this.users.countDocuments();
  }

  async nbFiles() {
    return this.files.countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
