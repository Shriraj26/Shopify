const Inventory = require('../models/inventory');
const DeletedInventory = require('../models/deletedItems');
const Comments = require('../models/comments');

module.exports.home = async function (req, res) {

    if (Object.keys(req.query).length > 0) {
        const idToRead = req.query.id;
        try {
            const item = await Inventory.findById({ _id: idToRead });
            if (item == null) {
                item = 'No item found';
            }
            return res.status(200).json({
                data: item,
                status: "Success",
                message: "Fetched the Item for given id"

            });

        } catch (err) {

            return res.status(500).json({

                status: "Failure",
                message: "Error while fetching an item",
                error: err

            });

        }

    } else {
        try {

            const items = await Inventory.find({});
            return res.status(200).json({
                status: "Success",
                message: "Fetched list of Items",
                data: items,
            });

        } catch (err) {

            return res.status(500).json({
                status: "Failure",
                message: "Error while fetching list of items",
                error: err

            });
        }
    }



}

module.exports.create = async function (req, res) {

    const data = req.body;

    try {

        await Inventory.create(data);
        return res.status(200).json({
            status: "Success",
            message: "Created an item for inventory successfully"
        });

    } catch (err) {

        return res.status(500).json({
            status: "Failure",
            message: "Error while creating an item",
            error: err

        });
    }
}

module.exports.update = async function (req, res) {

    const valueToUpdate = req.body;

    const idToUpdate = req.query.id;

    try {
        await Inventory.findByIdAndUpdate(idToUpdate, { $set: valueToUpdate })

        return res.status(200).json({
            status: "Success",
            message: 'Item Updated successfully!',

        });

    } catch (err) {
        return res.status(500).json({
            status: "Failure",
            message: "Error while updating an item",
            error: err

        });
    }

}

module.exports.delete = async function (req, res) {


    const idToDelete = req.query.id;
    try {

        let a = await Inventory.findByIdAndDelete({ _id: idToDelete });

        // insert into the deleted items table
        let b = await DeletedInventory.create({
            itemId: a._id,
            name: a.name,
            company: a.company,
            quantity: a.quantity,
            unit_price: a.unit_price,
            image_url: a.image_url,
            thumbnail_url: a.thumbnail_url,
            originalCreatedAt: a.createdAt,
        });

        if (req.body.comment) {

            // insert into the comments table - 
            const c = await Comments.create({
                comment: req.body.comment,
                itemId: a._id
            });

        }

        return res.status(200).json({
            status: "Success",
            message: "Item deleted successfully!"
        })

    } catch (err) {

        return res.status(500).json({
            status: "Failure",
            message: "Error while deleting an item",
            error: err

        });
    }
}

module.exports.undoDelete = async function (req, res) {


    /*
        Flow is this - 
        1. find and delete an item from deleted items table
        2. create an entry into the main
        3. what to do of the comment?
    */
    const idToDelete = req.query.id;

    try {



        const a = await DeletedInventory.findOne({ itemId: idToDelete });

        // insert into the Inventory again
        const b = await Inventory.create({
            _id: a.itemId,
            name: a.name,
            company: a.company,
            quantity: a.quantity,
            unit_price: a.unit_price,
            image_url: a.image_url,
            thumbnail_url: a.thumbnail_url,
            createdAt: a.originalCreatedAt,
            lastDeleted: a.createdAt

        });

        return res.status(200).json({
            status: "Success",
            message: "Item Undoed successfully!"
        })

    } catch (err) {

        return res.status(500).json({
            status: "Failure",
            message: "Error while undoing an item",
            error: err
        });
    }
}