const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(routes);

const port = 3333;
console.log(`listen on ${port}...`)
app.listen(port);