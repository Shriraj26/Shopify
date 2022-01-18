const mongoose = require('mongoose');

const inventorySchemma = mongoose.Schema(
    {
        // must be a string
        name: {
            type: String,
            required: true
        },
        // must be a string
        company: {
            type: String,
            required: true
        },
        // must be positive value
        quantity: {
            type: Number,
            require: true
        },
        // must be positive value
        unit_price: {
            type: Number,
            require: true
        },
        // must be positive value
        total_value: {
            type: Number,
            require: true
        },
        // must contain http format
        image_url: {
            type: String
        },
        // must contain http format
        thumbnail_url: {
            type: String
        },
        lastDeleted: {
            type: Date
        }
    }, {
    timestamps: true
}
);

const Inventory = mongoose.model('Inventory', inventorySchemma);


module.exports = Inventory;
