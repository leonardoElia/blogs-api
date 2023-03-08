const express = require('express');
 
const middlewares = require('./middlewares/validacoes');
const controllerLogin = require('./controller/login');
const controllerUser = require('./controller/user');
const controllerCategory = require('./controller/category');
const controllerPost = require('./controller/post');
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

app.get('/categories', middlewares.validateToken, controllerCategory.listarCategorias);

app.post('/post', middlewares.validateToken, middlewares.validatePost, controllerPost.criarPost);

app.get('/post', middlewares.validateToken, controllerPost.listarPost);

app.get('/post/:id', middlewares.validateToken, controllerPost.postId);

app.put('/post/:id',
middlewares.validateToken, middlewares.validateUpdate, controllerPost.atualizarPost);

app.delete('/post/:id', middlewares.validateToken, controllerPost.deletetarPost);

app.delete('/user/me', middlewares.validateToken, controllerUser.deletarUsuario);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
