const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    connectToDb : (cb) => {
        MongoClient.connect("mongodb://127.0.0.1:27017/listen_express?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1")
          .then((client) => {
            dbConnection = client.db();
            return cb();
          })
          .catch((err) => {
            console.log(err);
            return cb(err);
          })
    },
    getDb : () => dbConnection
}