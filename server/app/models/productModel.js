const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: {
        type: String
    },
    brand: {
        type: String
    },
    name: {
        type: String
    }
});

module.exports = mongoose.model("product", productSchema);