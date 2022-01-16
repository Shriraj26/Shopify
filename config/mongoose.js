const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/inventory_management', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to the database"));

db.once('open', () => {
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;

