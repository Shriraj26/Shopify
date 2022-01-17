const Inventory = require('../models/inventory');


const fs = require('fs');
const path = require("path");


module.exports.loadFileToDb = async function () {


    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/MOCK_DATA.json')));

    try {
        await Inventory.insertMany(data);
        console.log('Done!');
        return
    } catch (err) {
        console.log('Error inderting the data, ', err);
        return
    }
}

