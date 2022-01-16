const mongoose = require('mongoose');

const inventorySchemma = mongoose.Schema(
    {

        name: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            require: true
        },
        unit_price: {
            type: Number,
            require: true
        },
        total_value: {
            type: Number,
            require: true
        },
        image_url: {
            type: String
        },
        thumbnail_url: {
            type: String
        },

    }, {
    timestamps: true
}
);

const Inventory = mongoose.model('Inventory', inventorySchemma);


module.exports = Inventory;
