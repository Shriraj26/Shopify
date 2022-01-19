const ajvInstance = require('./ajv_instance');

const updateSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    company: { type: 'string' },
    quantity: { type: 'number', minimum: 1 },
    unit_price: { type: 'number', minimum: 1 },
    image_url: { type: 'string', format: 'uri' },
    thumbnail_url: { type: 'string', format: 'uri' },
  },
  additionalProperties: true,
};

module.exports = ajvInstance.compile(updateSchema);
