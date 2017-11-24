var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27027/politics',{useMongoClient: true});

var schema = new mongoose.Schema({
    number: Number,
    president: String,
    birth_year: Number,
    death_year: Number,
    took_office: String,
    left_office: String,
    party: String
});

var presidentsClass = mongoose.model('presidents', schema);

module.exports = presidentsClass;
