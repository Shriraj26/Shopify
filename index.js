const express = require('express');  //To use Express 
const cron = require('node-cron');
const clean = require('./helper/clean-deleted-table');

const port = 8000;  //port
const db = require('./config/mongoose');
const app = express();
app.use(express.json())

app.use('/', require('./routes'));
cron.schedule('* * * * *', clean);


app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Express Server is running! - ', port);

})