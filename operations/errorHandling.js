/* eslint-disable consistent-return */
const mongoose = require('mongoose');

function isMongoError(error) {
  const errorList = [
    mongoose.Error.CastError,
    mongoose.Error.DocumentNotFoundError,
  ];

  for (let i = 0; i < errorList.length; i += 1) {
    if (error instanceof errorList[i]) {
      return true;
    }
  }

  return false;
}

function createMongoResponse(error, resp) {
  if (error instanceof mongoose.Error.CastError) {
    return resp.status(400).json({
      message: 'Invalid id',
    });
  }

  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    return resp.status(400).json({
      message: 'Not Found',
    });
  }

  if (error instanceof mongoose.Error) {
    return resp.status(500).json({
      message: 'DB Error',
    });
  }
}

module.exports = {
  isMongoError,
  createMongoResponse,
};
