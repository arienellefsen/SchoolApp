var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Diretor
var Diretor = new Schema({
    nome: String,
    email: String,
    telefone: String,
    unidade: String,
    schoolAppId: String
});

module.exports = mongoose.model('Diretor', Diretor);