const mongoose = require('mongoose');

const deletedItemsSchemma = mongoose.Schema(
    {

        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Inventory'
        },
        originalCreatedAt: {
            type: mongoose.Schema.Types.Date,
            ref: 'Inventory'
        },
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

const DeletedInventory = mongoose.model('DeletedInventory', deletedItemsSchemma);


module.exports = DeletedInventory;
