const Inventory = require('../models/inventory');

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

    try {

        let a = await Inventory.findByIdAndDelete({ _id: req.body.id });
        console.log('Deleted Successfully');

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
