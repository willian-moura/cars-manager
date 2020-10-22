const express = require('express');
const CarController = require('./controllers/CarController');

const routes = express.Router();

routes.get('/cars', CarController.index);
routes.post('/cars', CarController.create);
routes.get('/cars/:id', CarController.get);
routes.put('/cars/:id', CarController.update);
routes.delete('/cars/:id', CarController.delete);

module.exports = routes;