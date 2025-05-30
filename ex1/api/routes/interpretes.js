var express = require('express');
var router = express.Router();
var Edicao = require('../controllers/edicao');

/* GET /interpretes */
router.get('/', function(req, res, next) {
  Edicao.listarInterpretes()
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(500).jsonp({ error: erro.message }));
});

module.exports = router;