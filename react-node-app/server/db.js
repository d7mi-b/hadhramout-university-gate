const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect("mongodb://0.0.0.0:27017/HUG")
            .then((client) => {
                dbConnection = client.db();
                return cb();
            })
            .catch( err => {
                console.log(err);
                return cb(err);
            })
    },
    getDb: () => dbConnection
}