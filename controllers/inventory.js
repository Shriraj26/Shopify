/* eslint-disable no-console */
const Inventory = require('../models/inventory');
const Validations = require('../operations/validators');
const errorHandler = require('../operations/errorHandling');

async function getItemById(req, res) {
  try {
    const idToRead = req.query.id;
    const item = await Inventory.findById({ _id: idToRead }).where('isActive').equals(true);

    if (!Validations.isDefined(item)) {
      return res.status(400).json({
        message: 'Invalid Item id',
      });
    }

    return res.status(200).json({
      data: item,
      status: 'Success',
    });
  } catch (err) {
    if (errorHandler.isMongoError(err)) {
      return errorHandler.createMongoResponse(err, res);
    }

    return res.status(500).json({
      message: 'Error while fetching the Item',
      error: err,
    });
  }
}

async function getAllItems(req, res) {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const startIndex = (page - 1) * limit;

    const results = await Inventory
      .find()
      .where('isActive').equals(true)
      .sort([['createdAt', -1]])
      .limit(limit)
      .skip(startIndex)
      .exec();

    return res.status(200).json(results);
  } catch (err) {
    if (errorHandler.isMongoError(err)) {
      return errorHandler.createMongoResponse(err, res);
    }

    return res.status(500).json({
      message: 'Error while fetching Items',
      error: err,
    });
  }
}

async function createItem(req, res) {
  const data = req.body;
  data.isActive = true;

  try {
    await Inventory.create(data);
    return res.status(200).json({
      status: 'Success',
      message: 'Created an item for inventory successfully',
    });
  } catch (err) {
    if (errorHandler.isMongoError(err)) {
      return errorHandler.createMongoResponse(err, res);
    }

    return res.status(500).json({
      status: 'Failure',
      message: 'Error while creating an item',
      error: err,

    });
  }
}

async function updateItem(req, res) {
  try {
    const valueToUpdate = req.body;
    const idToUpdate = req.query.id;

    const itemToUpdate = await Inventory.findByIdAndUpdate(idToUpdate, { $set: valueToUpdate })
      .where('isActive').equals(true);

    if (!Validations.isDefined(itemToUpdate)) {
      return res.status(400).json({
        message: 'Invalid Item id',
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: 'Item Updated successfully!',
    });
  } catch (err) {
    if (errorHandler.isMongoError(err)) {
      return errorHandler.createMongoResponse(err, res);
    }

    return res.status(500).json({
      message: 'Error while updating an item',
    });
  }
}

async function deleteItem(req, res) {
  const idToDelete = req.query.id;
  try {
    // UPdate the item, set isActive to false and push comment
    let commentString = '';
    if (req.body.comment) {
      commentString = req.body.comment;
      console.log('Here comment ', commentString);
    }

    const itemToDelete = await Inventory
      .findByIdAndUpdate(
        idToDelete,
        {
          $set: { isActive: false },
          $push: { comments: { comment: commentString, createdAt: new Date() } },
        },
      )
      .where('isActive').equals(true);

    if (!Validations.isDefined(itemToDelete)) {
      return res.status(400).json({
        message: 'Invalid Item id',
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: 'Item deleted successfully!',
      data: {
        itemToDelete,
        comment: itemToDelete.comments,
      },
    });
  } catch (err) {
    if (errorHandler.isMongoError(err)) {
      return errorHandler.createMongoResponse(err, res);
    }
    console.log(err);
    return res.status(500).json({
      status: 'Failure',
      message: 'Error while deleting an item',
      error: err,

    });
  }
}

async function undoDelete(req, res) {
  const idToRetrieve = req.query.id;

  try {
    // update the item and set its isActive flag to true
    const retrieveItem = await Inventory
      .findByIdAndUpdate(idToRetrieve, { $set: { isActive: true } })
      .where('isActive').equals(false);

    // if that item does not exist....
    if (!Validations.isDefined(retrieveItem)) {
      return res.status(400).json({
        message: 'Invalid Item id',
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: 'Item Undoed successfully!',
      data: retrieveItem,
    });
  } catch (err) {
    if (errorHandler.isMongoError(err)) {
      return errorHandler.createMongoResponse(err, res);
    }

    return res.status(500).json({
      status: 'Failure',
      message: 'Error while undoing an item',
      error: err,
    });
  }
}

module.exports = {
  getItemById,
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  undoDelete,
};
