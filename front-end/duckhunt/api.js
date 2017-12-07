var express = require('express');
var api = express();

api.all('/api/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

api.get('/api/acessos/usuario', function (req, res) {
  res.json({
    dados: {
      Nome: 'Administrador',
      Permissoes: [{
        Nome: 'Administrador'
      }]
    }
  });
});

api.get('/api/health', function (req, res) {
  res.json({
    dados: {
      situacao: 'OK'
    }
  });
});

api.listen(3000, function () {
  console.log('API listening on port 3000!');
});