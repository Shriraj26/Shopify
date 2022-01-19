const express = require('express'); // To use Express
const cron = require('node-cron');
const clean = require('./helper/clean-deleted-table');

const app = express();
app.use(express.json());

app.use('/', require('./routes'));

// cron.schedule('* * * * *', clean);

module.exports = app;
