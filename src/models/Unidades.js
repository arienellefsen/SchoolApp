var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Unidades = new mongoose.Schema({
    nomeUnidade: String,
    unidadeCodigo: String,
    endereco: String,
    email: String,
    phone: String,
    schoolAppId: String
});

//criar um relation com o school app table

module.exports = mongoose.model("Unidades", Unidades);