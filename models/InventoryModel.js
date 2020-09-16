const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  inventoryItems: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'InventoryItem',
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;
