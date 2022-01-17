const Inventory = require('../models/inventory');
const DeletedInventory = require('../models/deletedItems');
const Comments = require('../models/comments');

module.exports.home = async function (req, res) {
    // console.log('In home');
}

module.exports.create = async function (req, res) {

    let data = req.body;
    try {

        await Inventory.create(data);
        let items = await Inventory.find({});
        return res.status(200).json({
            data: items,
            status: "Success",
            message: "Created an item for inventory successfully"
        });

    } catch (err) {
        console.log('Error creating an inventory item - ', err);
        return res.status(500).json({
            data: item,
            status: "Failure",
            message: "Error while creating an item"

        });
    }
}

module.exports.read = async function (req, res) {

    try {

        let items = await Inventory.find({});
        return res.status(200).json({
            data: items,
            status: "Success",
            message: "Fetched list of Items"
        });

    } catch (err) {
        console.log('Error while fetching the items - ', err);
        return res.status(500).json({
            data: item,
            status: "Failure",
            message: "Error while fetching list of items"

        });
    }
}

module.exports.get = async function (req, res) {

    try {
        let item = await Inventory.findById({ _id: req.body.id });
        if (item == null) {
            item = 'No item found';
        }
        return res.status(200).json({
            data: item,
            status: "Success",
            message: "Fetched the Item for given id"

        });

    } catch (err) {
        console.log('Error while fetching an item ', err);
        return res.status(500).json({
            data: item,
            status: "Failure",
            message: "Error while fetching an item"

        });

    }
}


module.exports.update = async function (req, res) {

    let valueToUpdate = req.body;
    try {
        let a = await Inventory.findByIdAndUpdate(req.body.id, { $set: valueToUpdate })
        a = await Inventory.findById(valueToUpdate.id);

        //console.log('updated value - ', a);

        return res.status(200).json({
            status: "Success",
            message: 'Item Updated successfully!',
            data: a
        })

    } catch (err) {
        return res.status(500).json({
            data: item,
            status: "Failure",
            message: "Error while updating an item"

        });
    }

}

module.exports.delete = async function (req, res) {
    console.log('In delete');
    /*
        Flow is this - 
        1. delete item from main table
        2. create an entry into the deleted items table
        2. if comment has been made, then create a comment for it as well in comment table
    */
    try {

        let a = await Inventory.findByIdAndDelete({ _id: req.body.id });

        // insert into the deleted items table
        let b = await DeletedInventory.create({
            itemId: a._id,
            name: a.name,
            company: a.company,
            quantity: a.quantity,
            unit_price: a.unit_price,
            image_url: a.image_url,
            thumbnail_url: a.thumbnail_url,
            createdAt: a.createdAt,
            updatedAt: a.updatedAt

        });
        console.log(req.body.comment);
        if (req.body.comment) {
            console.log('Here')
            // insert into the comments table - 
            let c = await Comments.create({
                comment: req.body.comment,
                itemId: a._id
            });
            console.log('comment is ', c);
        }

        return res.status(200).json({
            status: "Success",
            message: "Item deleted successfully!"
        })

    } catch (err) {
        console.log('Error deleting the item - ', err);
        return res.status(500).json({
            data: item,
            status: "Failure",
            message: "Error while deleting an item"

        });
    }
}

module.exports.undoDelete = async function (req, res) {

    console.log('In undo delete');
    /*
        Flow is this - 
        1. find and delete an item from deleted items table
        2. create an entry into the main
        3. what to do of the comment?
    */

    try {

        // let x = await DeletedInventory.findOne({ itemId: req.body.id });
        // console.log('item to undo delete is - ', x);

        let a = await DeletedInventory.findOne({ itemId: req.body.id });

        // insert into the Inventory again
        let b = await Inventory.create({
            _id: a.itemId,
            name: a.name,
            company: a.company,
            quantity: a.quantity,
            unit_price: a.unit_price,
            image_url: a.image_url,
            thumbnail_url: a.thumbnail_url,
            createdAt: a.createdAt,
            updatedAt: a.updatedAt

        });

        console.log(b);

        return res.status(200).json({
            status: "Success",
            message: "Item Undoed successfully!"
        })

    } catch (err) {
        console.log('Error Undoing the item - ', err);
        return res.status(500).json({
            data: item,
            status: "Failure",
            message: "Error while undoing an item"

        });
    }
}