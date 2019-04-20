const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema(
  {
    url: { type: String, required: true },
    hash: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }   
  }
);

module.exports = mongoose.model('Link', LinkSchema);
