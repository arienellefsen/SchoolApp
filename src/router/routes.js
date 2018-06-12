var express = require('express');
var app = express();
var routers = express.Router();

// Require Item model in our routes module
var SchoolApp = require('../models/SchoolApp');
var Unidades = require('../models/Unidades.js');
var Alunos = require('../models/Alunos.js');
var Pisicologo = require('../models/Psicologo.js');
var Diretor = require('../models/Diretor.js');

// Defined get data(index or listing) route
routers.route('/').get(function(req, res) {
    res.send('test router');
});

//Save school
//Verify if user doesn't exist
routers.route('/saved').post(function(req, res) {
    SchoolApp.find({ schoolName: 'test' },
        function(err, docs) {
            if (docs.length) {
                console.log('name already exists');

            } else {
                SchoolApp.create({
                    schoolName: 'name1',
                    email: 'email1',
                    schoolLogo: 'logo1',
                    endereco: 'endereco1'
                }, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send("School saved");
                    }
                });
            }
        });
});

//Save Alunos
//Verify if user doesn't exist
routers.route('/criarOcorrido').post(function(req, res) {
    Alunos.find({ rg: '1234' },
        function(err, docs) {
            if (docs.length) {
                console.log('rg already exists');
            } else {
                Alunos.create({
                    nome: 'nome aluno',
                    rg: 'rg',
                    telefone: 'telefone',
                    email: 'email',
                    responsavel: 'resp',
                    serie: 'serie',
                    unidade: 'unidade',
                    foto: 'foto aluno'
                }, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send("Aluno saved");
                    }
                });
            }
        });
});

//Pisicologo
routers.route('/adicionarPsicologo').post(function(req, res) {
    Pisicologo.find({ tel: '1234' },
        function(err, docs) {
            if (docs.length) {
                console.log('tel already exists');
            } else {
                Pisicologo.create({
                    nome: 'nome pisicologo',
                    telefone: 'telefone pisicologo',
                    email: 'email pisicologo',
                }, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send("Pisicologo saved");
                    }
                });
            }
        });
});

//Diretor
routers.route('/adicionarDiretor').post(function(req, res) {
    Diretor.find({ email: 'test@test.com' },
        function(err, docs) {
            if (docs.length) {
                console.log('email already exists');
            } else {
                Diretor.create({
                    nome: 'nome diretor',
                    telefone: 'telefone diretor',
                    email: 'email diretor',
                    unidade: 'unidade diretor'
                }, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send("Diretor saved");
                    }
                });
            }
        });
});

//Save user AFFIRMATION
// New note creation via POST route
routers.route('/addSchool').post(function(req, res) {
    var newUnidade = new Unidades({ nomeUnidade: 'unidade1' });
    console.log('unidade');
    // Save the new note to mongoose
    newUnidade.save(function(error, doc) {
        //Send any errors to the browser
        if (error) {
            res.send(error);
        }
        // Otherwise
        else {
            // Find our user and push the new note id into the User's notes array
            SchoolApp.findOneAndUpdate({ unidadeCodigo: '123' }, {
                $push: {
                    "unidades": doc._id
                }
            }, {
                new: true
            }, function(err, newdoc) {
                // Send any errors to the browser
                if (err) {
                    res.send(err);
                }
                // Or send the newdoc to the browser
                else {
                    res.send(newdoc);
                }
            });
        }
    });
});


module.exports = routers;