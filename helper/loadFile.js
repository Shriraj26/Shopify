const fs = require('fs');
const path = require('path');
const Inventory = require('../models/inventory');
const Comment = require('../models/comments');
const DeletedItems = require('../models/deletedItems');
const DeletedInventory = require('../models/deletedItems');

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

async function cleanTestDB() {
  try {
    console.log('In the env sdsd- ', process.env.NODE_ENV);
    // await Inventory.deleteMany();
    // await Comment.deleteMany();
    // await DeletedInventory.deleteMany();
  } catch (err) {
    console.log('error cleaning the table');
  }
}

module.exports = {
  loadFileToDb, cleanTestDB,
};
