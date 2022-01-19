const express = require('express'); // To use Express

const app = express();
app.use(express.json());

app.use('/', require('./routes'));

module.exports = app;
