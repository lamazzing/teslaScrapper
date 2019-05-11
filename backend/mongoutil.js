const MongoClient = require('mongodb').MongoClient;
const {uri} = require('./constants/mongodb-connect');
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {

    if (err) {
        return console.log('Unable to connect to database');
    }
    console.log('connected to the database');
    const db = client.db('TodoApp')
    db.collection('Users').insertOne({
        name: 'Luca',
        age: 27,
        location: 'Paris',
    }, (err, result) => {
        if (err){
            console.log('Unable to insert User', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    })
  const collection = client.db("test").collection("devices");
 // perform actions on the collection object
  client.close();
});
