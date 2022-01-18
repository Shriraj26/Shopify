const ajvInstance = require('./ajv_instance');

const createSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        company: { type: "string" },
        quantity: { type: "number" },
        unit_price: { type: "number" },
        image_url: { type: "string", format: "uri" },
        thumbnail_url: { type: "string", format: "uri" }
    },
    required: ["name", "company", "quantity", "unit_price"],
    additionalProperties: false
}

module.exports = ajvInstance.compile(createSchema);










