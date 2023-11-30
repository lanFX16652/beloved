const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    title: {
        type: String
    },
    path: {
        type: String
    }
});

module.exports = mongoose.model("media", mediaSchema);