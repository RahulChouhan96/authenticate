const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const TicketSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    busId: {
        type: Schema.Types.ObjectId,
        ref: "Bus"
    },
    seatNo: Number,
    status: String,
    travelDate: String
});

module.exports = mongoose.model("Ticket", TicketSchema);