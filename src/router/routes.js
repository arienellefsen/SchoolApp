var express = require('express');
var app = express();
var routers = express.Router();

//Check if user is authenticated
var loggedin = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

//Declaring Models to routers 
var EscolaApp = require('../models/EscolaApp');
var Unidades = require('../models/Unidades.js');
var Alunos = require('../models/Alunos.js');
var Pisicologo = require('../models/Psicologo.js');
var Diretor = require('../models/Diretor.js');
var Ocorrido = require('../models/Ocorridos.js');

//Router initial page
routers.get('/', (req, res) => {
    res.send('test router ariene');
});

// ********* - REST API Escola **************** 

//1- Criar Escola

routers.post('/criar', (req, res) => {
    EscolaApp.find({ schoolName: 'test' },
        function(err, docs) {
            if (docs.length) {
                console.log('name already exists');

            } else {
                EscolaApp.create({
                    schoolName: 'name2',
                    email: 'email2',
                    schoolLogo: 'logo2',
                    endereco: 'endereco2'
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


//2 - Ler todas - Escola
routers.get('/escolas', (req, res) => {
    EscolaApp.find({})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
});

routers.get('/login', (req, res, next) => {
    res.render('index');
});

routers.get('/signup', (req, res, next) => {
    res.render('signup');
});

routers.get('/profile', loggedin, (req, res, next) => {
    res.render('profile', {
        user: req.user
    })
});

routers.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
});

//3 - Ler uma Escola
routers.get('/escolas/:id', (req, res) => {
    EscolaApp.findById(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(404).json({ success: false, msg: `Escola nao localizada.` });
        });
});

//4 - Editar Escola por id
routers.put('/:id', (req, res) => {
    let updatedUser = {
        schoolName: 'update school name',
        email: 'update school email',
        schoolLogo: 'update school logo',
        endereco: 'update school endereco',
        unidadeCodigo: 'update school codigo'
    };

    EscolaApp.findOneAndUpdate({ _id: req.params.id }, updatedUser, { runValidators: true, context: 'query' })
        .then((oldResult) => {
            EscolaApp.findOne({ _id: req.params.id })
                .then((newResult) => {
                    res.json({
                        success: true,
                        msg: `Successfully updated!`,
                        result: {
                            _id: newResult._id,
                            schoolName: newResult.schoolName,
                            email: newResult.email,
                            schoolLogo: newResult.schoolLogo,
                            endereco: newResult.endereco,
                            unidadeCodigo: newResult.unidadeCodigo
                        }
                    });
                })
                .catch((err) => {
                    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
                    return;
                });
        })
        .catch((err) => {
            if (err.errors) {
                if (err.errors.schoolName) {
                    res.status(400).json({ success: false, msg: err.errors.schoolName.message });
                    return;
                }
                if (err.errors.email) {
                    res.status(400).json({ success: false, msg: err.errors.email.message });
                    return;
                }
                if (err.errors.schoolLogo) {
                    res.status(400).json({ success: false, msg: err.errors.schoolLogo.message });
                    return;
                }
                if (err.errors.endereco) {
                    res.status(400).json({ success: false, msg: err.errors.endereco.message });
                    return;
                }

                if (err.errors.unidadeCodigo) {
                    res.status(400).json({ success: false, msg: err.errors.unidadeCodigo.message });
                    return;
                }

                // Show failed if all else fails for some reasons
                res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
            }
        });
});

//5 - deletar escola por id
routers.delete('/:id', (req, res) => {
    EscolaApp.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.json({
                success: true,
                msg: `It has been deleted.`,
                result: {
                    _id: result._id,
                    schoolName: result.name,
                    email: result.email,
                    schoolLogo: result.schoolLogo,
                    endereco: result.endereco,
                    unidadeCodigo: result.unidadeCodigo
                }
            });
        })
        .catch((err) => {
            res.status(404).json({ success: false, msg: 'Nothing to delete.' });
        });
});

//1 - Criar Aluno

routers.post('/criar-ocorrido', (req, res) => {
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

//2 - Ler todas - Alunos
routers.get('/ocorrido', (req, res) => {
    Alunos.find({})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
});

//3 - Ler uma Escola
routers.get('/ocorrido/:id', (req, res) => {
    Alunos.findById(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(404).json({ success: false, msg: `Aluno nao existe.` });
        });
});

//4 - Editar Aluno por id
routers.put('/alunos/:id', (req, res) => {
    let atualizarAluno = {
        nome: 'update aluno nome',
        rg: 'update aluno rg',
        telefone: 'update aluno telefone',
        email: 'update aluno email',
        responsavel: 'update aluno responsavel',
        serie: 'update aluno serie',
        unidade: 'update aluno unidade',
        foto: 'update aluno foto',
    };

    Alunos.findOneAndUpdate({ _id: req.params.id }, atualizarAluno, { runValidators: true, context: 'query' })
        .then((oldResult) => {
            Alunos.findOne({ _id: req.params.id })
                .then((newResult) => {
                    res.json({
                        success: true,
                        msg: `Successfully updated!`,
                        result: {
                            _id: newResult._id,
                            nome: newResult.nome,
                            rg: newResult.rg,
                            email: newResult.email,
                            responsavel: newResult.responsavel,
                            serie: newResult.serie,
                            unidade: newResult.unidade,
                            foto: newResult.foto
                        }
                    });
                })
                .catch((err) => {
                    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
                    return;
                });
        })
        .catch((err) => {
            if (err.errors) {
                if (err.errors.nome) {
                    res.status(400).json({ success: false, msg: err.errors.nome.message });
                    return;
                }
                if (err.errors.rg) {
                    res.status(400).json({ success: false, msg: err.errors.rg.message });
                    return;
                }
                if (err.errors.email) {
                    res.status(400).json({ success: false, msg: err.errors.email.message });
                    return;
                }
                if (err.errors.responsavel) {
                    res.status(400).json({ success: false, msg: err.errors.responsavel.message });
                    return;
                }

                if (err.errors.serie) {
                    res.status(400).json({ success: false, msg: err.errors.serie.message });
                    return;
                }

                if (err.errors.unidade) {
                    res.status(400).json({ success: false, msg: err.errors.unidade.message });
                    return;
                }

                if (err.errors.foto) {
                    res.status(400).json({ success: false, msg: err.errors.foto.message });
                    return;
                }

                // Show failed if all else fails for some reasons
                res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
            }
        });
});

//5 - deletar Aluno por id
routers.delete('/ocorrido/:id', (req, res) => {
    Alunos.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.json({
                success: true,
                msg: `It has been deleted.`,
                result: {
                    _id: result._id,
                    nome: result.nome,
                    email: result.email,
                    responsavel: result.responsavel,
                    serie: result.serie,
                    unidade: result.unidade,
                    foto: result.foto
                }
            });
        })
        .catch((err) => {
            res.status(404).json({ success: false, msg: 'Nothing to delete.' });
        });
});

// ********* - REST API Pisicologo **************** 
//Pisicologo
routers.post('/adicionar-psicologo', (req, res) => {
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

//2 - Ler todas - Pisicologo
routers.get('/psicologo', (req, res) => {
    Pisicologo.find({})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
});

//3 - Ler um Pisicologo
routers.get('/psicologo/:id', (req, res) => {
    Pisicologo.findById(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(404).json({ success: false, msg: `Pisicologo nao existe.` });
        });
});

//4 - Editar Pisicologo por id
routers.put('/psicologo/:id', (req, res) => {
    let atualizarPsicologo = {
        nome: 'update psicologo nome',
        email: 'update psicologo email',
        telefone: 'update psicologo telefone',
        schoolAppId: 'update psicologo schoolAppId'
    };

    Pisicologo.findOneAndUpdate({ _id: req.params.id }, atualizarPsicologo, { runValidators: true, context: 'query' })
        .then((oldResult) => {
            Pisicologo.findOne({ _id: req.params.id })
                .then((newResult) => {
                    res.json({
                        success: true,
                        msg: `Successfully updated!`,
                        result: {
                            _id: newResult._id,
                            nome: newResult.nome,
                            email: newResult.email,
                            telefone: newResult.telefone,
                            schoolAppId: newResult.schoolAppId
                        }
                    });
                })
                .catch((err) => {
                    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
                    return;
                });
        })
        .catch((err) => {
            if (err.errors) {
                if (err.errors.nome) {
                    res.status(400).json({ success: false, msg: err.errors.nome.message });
                    return;
                }
                if (err.errors.email) {
                    res.status(400).json({ success: false, msg: err.errors.email.message });
                    return;
                }
                if (err.errors.telefone) {
                    res.status(400).json({ success: false, msg: err.errors.telefone.message });
                    return;
                }
                // Show failed if all else fails for some reasons
                res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
            }
        });
});

//5 - deletar Aluno por id
routers.delete('/psicologo/:id', (req, res) => {
    Pisicologo.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.json({
                success: true,
                msg: `It has been deleted.`,
                result: {
                    _id: result._id,
                    nome: result.nome,
                    email: result.email,
                    telefone: result.telefone
                }
            });
        })
        .catch((err) => {
            res.status(404).json({ success: false, msg: 'Nothing to delete.' });
        });
});

// ********* - REST API Diretor **************** 

//1 - Adicionar Diretor
routers.post('/adicionar-diretor', (req, res) => {
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

//2 - Ler todas - Diretores
routers.get('/diretores', (req, res) => {
    Diretor.find({})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
});

//3 - Ler um Diretor
routers.get('/diretor/:id', (req, res) => {
    Diretor.findById(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(404).json({ success: false, msg: `Pisicologo nao existe.` });
        });
});

//4 - Editar Diretor por id
routers.put('/diretor/:id', (req, res) => {
    let atualizarDiretor = {
        nome: 'update diretor nome',
        email: 'update diretor email',
        telefone: 'update diretor telefone',
        unidade: 'update diretor unidade',
        schoolAppId: 'update diretor schoolAppId'
    };

    Diretor.findOneAndUpdate({ _id: req.params.id }, atualizarDiretor, { runValidators: true, context: 'query' })
        .then((oldResult) => {
            Diretor.findOne({ _id: req.params.id })
                .then((newResult) => {
                    res.json({
                        success: true,
                        msg: `Successfully updated!`,
                        result: {
                            _id: newResult._id,
                            nome: newResult.nome,
                            email: newResult.email,
                            telefone: newResult.telefone,
                            unidade: newResult.unidade,
                            schoolAppId: newResult.schoolAppId
                        }
                    });
                })
                .catch((err) => {
                    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
                    return;
                });
        })
        .catch((err) => {
            if (err.errors) {
                if (err.errors.nome) {
                    res.status(400).json({ success: false, msg: err.errors.nome.message });
                    return;
                }
                if (err.errors.email) {
                    res.status(400).json({ success: false, msg: err.errors.email.message });
                    return;
                }
                if (err.errors.telefone) {
                    res.status(400).json({ success: false, msg: err.errors.telefone.message });
                    return;
                }
                // Show failed if all else fails for some reasons
                res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
            }
        });
});

//5 - deletar Diretor por id
routers.delete('/diretor/:id', (req, res) => {
    Diretor.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.json({
                success: true,
                msg: `It has been deleted.`,
                result: {
                    _id: result._id,
                    nome: result.nome,
                    email: result.email,
                    telefone: result.telefone,
                    unidade: result.unidade
                }
            });
        })
        .catch((err) => {
            res.status(404).json({ success: false, msg: 'Nothing to delete.' });
        });
});


// ********* - REST API Unidades **************** 

//1 - Adicionar Unidade
routers.post('/adicionar-unidade', (req, res) => {
    Unidades.find({ nomeUnidade: 'test@test.com' },
        function(err, docs) {
            if (docs.length) {
                console.log('email already exists');
            } else {
                Unidades.create({
                    nomeUnidade: 'nome nomeUnidade',
                    unidadeCodigo: 'unidadeCodigo',
                    endereco: 'endereco Unidade',
                    email: 'email unidade',
                    phone: 'phone unidade'
                }, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send("Unidade saved");
                    }
                });
            }
        });
});

//2 - Ler todas - Unidades
routers.get('/unidades', (req, res) => {
    Unidades.find({})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
});

//3 - Ler uma Unidade
routers.get('/unidade/:id', (req, res) => {
    Unidades.findById(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(404).json({ success: false, msg: `Pisicologo nao existe.` });
        });
});

//4 - Editar Unidade por id
routers.put('/unidade/:id', (req, res) => {
    let atualizarUnidade = {
        nomeUnidade: 'update unidade nomeUnidade',
        unidadeCodigo: 'update unidade unidadeCodigo',
        endereco: 'update unidade endereco',
        email: 'update unidade email',
        phone: 'update unidade phone'
    };

    Unidades.findOneAndUpdate({ _id: req.params.id }, atualizarUnidade, { runValidators: true, context: 'query' })
        .then((oldResult) => {
            Unidades.findOne({ _id: req.params.id })
                .then((newResult) => {
                    res.json({
                        success: true,
                        msg: `Successfully updated!`,
                        result: {
                            _id: newResult._id,
                            nomeUnidade: newResult.nomeUnidade,
                            unidadeCodigo: newResult.unidadeCodigo,
                            endereco: newResult.endereco,
                            email: newResult.email,
                            phone: newResult.phone
                        }
                    });
                })
                .catch((err) => {
                    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
                    return;
                });
        })
        .catch((err) => {
            if (err.errors) {
                if (err.errors.nomeUnidade) {
                    res.status(400).json({ success: false, msg: err.errors.nomeUnidade.message });
                    return;
                }
                if (err.errors.unidadeCodigo) {
                    res.status(400).json({ success: false, msg: err.errors.unidadeCodigo.message });
                    return;
                }
                if (err.errors.endereco) {
                    res.status(400).json({ success: false, msg: err.errors.endereco.message });
                    return;
                }
                if (err.errors.email) {
                    res.status(400).json({ success: false, msg: err.errors.email.message });
                    return;
                }
                if (err.errors.phone) {
                    res.status(400).json({ success: false, msg: err.errors.phone.message });
                    return;
                }
                // Show failed if all else fails for some reasons
                res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
            }
        });
});

//5 - deletar Diretor por id
routers.delete('/unidade/:id', (req, res) => {
    Unidades.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.json({
                success: true,
                msg: `It has been deleted.`,
                result: {
                    _id: result._id,
                    nomeUnidade: result.nomeUnidade,
                    unidadeCodigo: result.unidadeCodigo,
                    endereco: result.endereco,
                    unidade: result.unidade,
                    email: result.email,
                    phone: result.phone
                }
            });
        })
        .catch((err) => {
            res.status(404).json({ success: false, msg: 'Nothing to delete.' });
        });
});


//Ocorridos
routers.post('/ocorridos', (req, res) => {
    Ocorrido.find({ ocorrido: 'test' },
        function(err, docs) {
            if (docs.length) {
                console.log('email already exists');
            } else {
                Ocorrido.create({
                    ocorrido: 'ocorrido2',
                    data: 'data2',
                    time: 'time2',
                    tipo: 'tipo2'
                }, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send("Ocorrido saved");
                    }
                });
            }
        });
});

//Save user AFFIRMATION
// New note creation via POST route
routers.post('/addSchool', (req, res) => {
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