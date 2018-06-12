var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Alunos
var Alunos = new Schema({
    nome: String,
    rg: String,
    telefone: String,
    email: String,
    responsavel: String,
    serie: String,
    unidade: String,
    foto: String
});

module.exports = mongoose.model('Alunos', Alunos);