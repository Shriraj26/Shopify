const mongoose = require('mongoose');
const env = require('./environment');

const { db_name } = env[process.env.NODE_ENV];

mongoose.connect(`mongodb://localhost/${db_name}`, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the database'));

db.once('open', () => {
  console.log('Connected to Database :: MongoDB - ', db_name);
});

module.exports = db;
