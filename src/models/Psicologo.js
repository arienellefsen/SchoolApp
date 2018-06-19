var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Pisicologo
var Pisicologo = new Schema({
    nome: String,
    email: String,
    telefone: String,
    schoolAppId: String
});

module.exports = mongoose.model('Pisicologo', Pisicologo);