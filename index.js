const express = require('express');  //To use Express 
const path = require('path');  //path variable for getting path dynamically 

const port = 8000;  //port
const db = require('./config/mongoose');
const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// use express router
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Express Server is running! - ', port);

})