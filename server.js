const express = require("express");
const mongoose = require("mongoose");

const Ticket = require("./models/Ticket");
const User = require("./models/User");
const Bus = require("./models/Bus");


let app = express();
app.use(express.json());


app.post("/ticket/update/open", async (req, res) => {
    try {
        await Ticket.findByIdAndUpdate(req.body.ticketId, { "$set": { status: "OPEN" } });
        res.status(200).json({ message: "Successfully updated!" });
    }
    catch (e) {
        res.status(400).json({ message: "Error!", error: e });
    }
});


app.post("/ticket/update/close", async (req, res) => {
    try {
        // Create user, if doesn't exist yet
        let userData = await User.findOne({ email: req.body.userDetails.email });
        if (!userData) {
            userData = new User({
                email: req.body.userDetails.email,
                userName: req.body.userDetails.userName
            });
            await userData.save();
        }

        // Check if seat is already booked or not
        const existingTicket = await Ticket.findOne({ 
            busId: req.body.busId, seatNo: req.body.seatNo, travelDate: req.body.travelDate, status: "CLOSE" 
        });
        if (existingTicket) {
            res.status(404).json({ message: "Seat is already booked. Pls try some other seat." });
            return;
        }

        // Create ticket
        const newTicket = new Ticket({
            userId: userData._id,
            busId: req.body.busId,
            seatNo: req.body.seatNo,
            status: "CLOSE",
            travelDate: req.body.travelDate
        })
        await newTicket.save()
        res.status(200).json({ message: "Successfully created!" });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ message: "Error!", error: e });
    }
});


app.get("/ticket/status", async (req, res) => {
    try {
        const ticketData = await Ticket.findById(req.query.ticketId);
        const ticketStatus = ticketData.status;
        res.status(200).json({ status: ticketStatus });
    }
    catch (e) {
        res.status(400).json({ message: "Error!", error: e });
    }
});


app.get("/ticket/close/tickets", async (req, res) => {
    try {
        const closeTickets = await Ticket.find({ status: "CLOSE", busId: req.query.busId });
        res.status(200).json(closeTickets);
    }
    catch (e) {
        res.status(400).json({ message: "Error!", error: e });
    }
});


app.get("/ticket/open/tickets", async (req, res) => {
    try {
        const tickets = await Ticket.find({ busId: req.query.busId });

        // Find seats that are not booked yet (as they're open for booking)
        const closeTickets = tickets.filter(t => t.status == "CLOSE");
        const closeSeatNos = closeTickets.map(c => c.seatNo);
        const openTickets = tickets.filter(t => t.status == "OPEN");
        const otherOpenTickets = [];
        for (let seatNo = 1; seatNo <= 40; seatNo++) {
            if (!closeSeatNos.includes(seatNo))
                otherOpenTickets.push({seatNo, status: "OPEN"});
        }

        // Merge above opened tickets and those tickets which might be canceling by user
        const allOpenTickets = [...openTickets, ...otherOpenTickets];
        res.status(200).json(allOpenTickets);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ message: "Error!", error: e });
    }
});


app.get("/ticket/traveler", async (req, res) => {
    try {
        const ticketData = await Ticket.findById(req.query.ticketId).populate("userId");
        res.status(200).json(ticketData.userId);
    }
    catch (e) {
        res.status(400).json({ message: "Error!", error: e });
    }
});


app.put("/admin/reset/tickets", async (req, res) => {
    try {
        await Ticket.updateMany(
            { busId: req.body.busId, travelDate: req.body.travelDate, status: "CLOSE" }, 
            { "$set": {status: "OPEN"} }
        );
        res.status(200).json({ message: "Reset all close tickets." });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ message: "Error!", error: e });
    }
});


mongoose.connect("mongodb://127.0.0.1:27017/authenticate", {
    useNewUrlParser:true
});

let conn = mongoose.connection;
conn.on('error', (error) => {
    console.log("Error while connecting with MongoDB!", error);
});

conn.once('open', () => {
    console.log("MongoDB Connected successfully!");
});


app.listen(8080, () => {
    console.log("Server running at 8080!");
})