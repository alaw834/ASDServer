const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const daycareBookingRoutes = express.Router();

const daycareBookingModel = require("../schema/daycareBooking.model");


//get all daycare 
daycareBookingRoutes.get("/listAllDaycareBooking", async (req, res) => {
    //search for all database results
    daycareBookingModel.find({}, (err, result) => {
        //send results
        if (err) {
            res.send(err);
            console.log('Fail');
        }
        res.send(result);
    });
});

daycareBookingRoutes.get("/listOneDaycareBooking/:id", async (req, res) => {
    //search for all database results
    daycareBookingModel.findById({_id: req.params.id}, (err, result) => {
        //send results
        if (err) {
            res.send(err);
            console.log('Fail');
        }
        res.send(result);
    });
});


daycareBookingRoutes.post("/addDaycareBooking", async (req, res) => {
    const daycareBooking = new daycareBookingModel({
        numberChildren: req.body.numberChildren,
        dcDate: req.body.dcDate,
        dcTime: req.body.dcTime,
        dcCost: req.body.dcCost,
        dcBookingStatus: req.body.dcBookingStatus,
        isDcPaid:req.body.isDcPaid,
        dcLocation: req.body.dcLocation,
        daycareId:req.body.daycareId,
        customerId:req.body.customerId

    });
    //save new object database
    try {
        await daycareBooking.save();
        console.log("New daycare Booking saved");
        res.send("Peanuts");
    } catch (err) {
        console.log(err);
    }
}); 

daycareBookingRoutes.put("/update", async (req, res) => {
    //get values from form from daycare list page
    const id = req.body._id;

    let updatedDaycareBooking= await daycareBookingModel.findById(id);

if (!updatedDaycareBooking)res.status400.json({ msg: "Error" });

updatedDaycareBooking.numberChildren = req.body.numberChildren,
updatedDaycareBooking.dcDate= req.body.dcDate,
updatedDaycareBooking.dcTime= req.body.dcTime,
updatedDaycareBooking.dcLocation= req.body.dcLocation,
updatedDaycareBooking.save();
res.send("update"); 
    
});

daycareBookingRoutes.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await daycareBookingModel.findByIdAndRemove(id).exec();
    res.send("test")
});

module.exports = daycareBookingRoutes;