const fs = require('fs');
const path = require('path');
const Inventory = require('../models/inventory');

async function loadFileToDb() {
  const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/MOCK_DATA.json')));
  try {
    await Inventory.insertMany(data);
    console.log('Done inserting all data to !', process.env.NODE_ENV);
    return;
  } catch (err) {
    console.log('Error inderting the data, ', err);
  }
}

module.exports = {
  loadFileToDb,
};
