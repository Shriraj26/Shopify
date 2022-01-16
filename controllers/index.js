const Inventory = require('../models/inventory');

module.exports.home = async function (req, res) {
    // console.log('In home');
}

module.exports.create = async function (req, res) {

    let data = req.body;

    try {

        await Inventory.create(data);

        let items = await Inventory.find({});

        return res.status(200).json(items);

    } catch (err) {
        console.log('Error creating an inventory item - ', err);
        return;
    }
}

module.exports.read = async function (req, res) {
    console.log('In read');

    try {
        let items = await Inventory.find({});
        return res.status(200).json(items);

    } catch (err) {
        console.log('Error while fetching the items - ', err);
        return;
    }
}

module.exports.get = async function (req, res) {
    console.log('In get');

    try {
        let item = await Inventory.findById({ _id: req.body.id });
        return res.status(200).json(item);

    } catch (err) {
        console.log('Error while fetching the items - ', err);
        return;
    }
}


module.exports.update = async function (req, res) {
    console.log('In update');
    console.log(req.body);
    let valueToUpdate = req.body;
    try {
        let a = await Inventory.findByIdAndUpdate(req.body.id, { $set: valueToUpdate })
        console.log('After update - ');
        a = await Inventory.findById(valueToUpdate.id);
        console.log('updated value - ', a);

        return res.status(200).json({
            status: 200,
            message: 'Updated successfully!',
            data: a
        })

    } catch (err) {
        console.log('Error while updating- ', err);
    }

}

module.exports.delete = async function (req, res) {
    console.log('In delete');

    try {

        let a = await Inventory.findByIdAndDelete({ _id: req.body.id });

        console.log('Deleted Successfully');

        a = await Inventory.find({});

        return res.status(200).json({
            message: "Deleted Successfully",
            data: a
        })

    } catch (err) {
        console.log('Error deleting the item - ', err);
    }
}
