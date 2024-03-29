const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  cname: {
    type: String,
    require: true

  },
  image:{
    public_id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        requiredd: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});
const CategoryModel = mongoose.model('category', CategorySchema);
module.exports = CategoryModel;