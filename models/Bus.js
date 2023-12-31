const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const BusSchema = new Schema({
    busName: String
});

module.exports = mongoose.model("Bus", BusSchema);