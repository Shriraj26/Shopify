const ajvInstance = require('./ajv_instance');

const updateSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        company: { type: "string" },
        quantity: { type: "number" },
        unit_price: { type: "number" },
        image_url: { type: "string", format: "uri" },
        thumbnail_url: { type: "string", format: "uri" }
    },
    additionalProperties: true
}

module.exports = ajvInstance.compile(updateSchema);










