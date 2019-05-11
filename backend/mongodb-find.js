const {MongoClient, ObjectID} = require('mongodb');
const {uri} = require('./constants/mongodb-connect');
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }
    const db = client.db('TeslaApp');

    db.collection('Todos').find({completed: true}).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    },(err) => {
        console.log('Unable to fetch todos', err);
    });

    //client.close();
});