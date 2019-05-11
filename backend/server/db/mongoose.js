var mongoose = require('mongoose');
var {uri} = require('../../constants/mongodb-connect');

mongoose.Promise = global.Promise;
mongoose.connect(uri, {dbName: 'TeslaApp'});

module.exports = {mongoose};