var express = require('express');
var app = express();
var uniRouter = express.Router();

var Unidades = require('../models/Unidades.js');


//2 - Ler todas - Unidades
uniRouter.get('/unidades', (req, res) => {
    Unidades.find({})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
});

module.exports = uniRouter;