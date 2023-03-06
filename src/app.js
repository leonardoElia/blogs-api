const express = require('express');
 
const middlewares = require('./middlewares/validacoes');
const controllerLogin = require('./controller/login');
const controllerUser = require('./controller/user');
const controllerCategory = require('./controller/category');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', middlewares.validationLogin, controllerLogin.login);

app.post('/user',
middlewares.validationUserNome,
middlewares.validationUserConta,
controllerUser.criarUser);

app.get('/user', middlewares.validateToken, controllerUser.listarUsuarios);

app.get('/user/:id',
middlewares.validateToken, middlewares.validateId, controllerUser.buscarUsuario);

app.post('/categories',
middlewares.validateToken, middlewares.validateName, controllerCategory.criarCategoria);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
