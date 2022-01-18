const ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajvInstance = new ajv({ allErrors: true });

addFormats(ajvInstance);

module.exports = ajvInstance;

