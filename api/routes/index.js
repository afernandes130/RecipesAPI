const routes = require('express').Router();
const userRoutes = require('./usersRoutes');

/* Defini rotas filhas */
routes.use('/users', userRoutes);

// Rota incial
routes.get('/', (req, res) => {
  return res.send('Welcome Recipes API');
});

module.exports = routes;
