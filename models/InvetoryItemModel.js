const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  sellingPrice: {
    type: Number,
  },
  costPrice: {
    type: Number,
  },
  quantity: {
    type: Number,
    min: [1, 'You can not add less than one item '],
  },
  name: {
    type: String,
    required: [true, 'Please enter the name of the inventory item'],
  },
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);
module.exports = InventoryItem;
