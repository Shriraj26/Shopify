const Inventory = require('../models/inventory');
const DeletedInventory = require('../models/deletedItems');
const Comments = require('../models/comments');
const { Errors } = require('../errors')

async function home(req, res) {

    if (Object.keys(req.query).length > 0) {
        const idToRead = req.query.id;
        try {
            let item = await Inventory.findById({ _id: idToRead });
            if (item == null) {
                item = 'No item found';
            }
            return res.status(200).json({
                data: item,
                status: "Success",
                message: "Fetched the Item for given id"

            });

        } catch (err) {
            console.log(err);
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

async function getAll(req, res) {

    try {

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;

        const results = await Inventory
            .find()
            .sort([["createdAt", -1]])
            .limit(limit)
            .skip(startIndex).exec();


        return res.status(200).json({
            data: results,
            status: "Success",
            message: "Fetched items succesfully!"
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: e.message,
        });
    }
}

async function create(req, res) {

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

async function update(req, res) {

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

async function deleteItem(req, res) {


    const idToDelete = req.query.id;
    try {

        let itemToDelete = await Inventory.findByIdAndDelete({ _id: idToDelete });

        //if itemToDelete does not exist, give error
        if (itemToDelete === null) {
            return res.status(500).json({
                status: "Failure",
                message: "Item not found in inventory, cannot delete",
            });
        }

        // insert into the deleted items table
        const deletedItem = await DeletedInventory.create({
            itemId: itemToDelete._id,
            name: itemToDelete.name,
            company: itemToDelete.company,
            quantity: itemToDelete.quantity,
            unit_price: itemToDelete.unit_price,
            image_url: itemToDelete.image_url,
            thumbnail_url: itemToDelete.thumbnail_url,
            originalCreatedAt: itemToDelete.createdAt,
        });

        let newComment = "";
        if (req.body.comment) {

            // insert into the comments table - 
            newComment = await Comments.create({
                comment: req.body.comment,
                itemId: itemToDelete._id
            });

        }

        return res.status(200).json({
            status: "Success",
            message: "Item deleted successfully!",
            data: {
                itemToDelete,
                comment: newComment.comment
            }
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "Failure",
            message: "Error while deleting an item",
            error: err

        });
    }
}

async function undoDelete(req, res) {


    /*
        Flow is this - 
        1. find and delete an item from deleted items table
        2. create an entry into the main
        3. what to do of the comment?
    */
    const idToDelete = req.query.id;

    try {



        const retrieveItem = await DeletedInventory.findOne({ itemId: idToDelete });

        //if that item does not exist....
        //if itemToDelete does not exist, give error
        if (retrieveItem === null) {
            return res.status(500).json({
                status: "Failure",
                message: "Item does not exist in deleted items table",
            });
        }

        // insert into the Inventory again
        const recoveredItem = await Inventory.create({
            _id: retrieveItem.itemId,
            name: retrieveItem.name,
            company: retrieveItem.company,
            quantity: retrieveItem.quantity,
            unit_price: retrieveItem.unit_price,
            image_url: retrieveItem.image_url,
            thumbnail_url: retrieveItem.thumbnail_url,
            createdAt: retrieveItem.originalCreatedAt,
            lastDeleted: retrieveItem.createdAt

        });

        return res.status(200).json({
            status: "Success",
            message: "Item Undoed successfully!",
            data: recoveredItem
        })

    } catch (err) {

        return res.status(500).json({
            status: "Failure",
            message: "Error while undoing an item",
            error: err
        });
    }
}

module.exports = {
    home,
    getAll,
    create,
    update,
    deleteItem,
    undoDelete

}