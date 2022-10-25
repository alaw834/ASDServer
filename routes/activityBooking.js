const express = require("express");

const activityBookingRoutes = express.Router();

const activityBookingModel = require("../schema/activityBooking.model");

activityBookingRoutes.get("/listAll", async (req, res) => {
    //search for all database results
    activityBookingModel.find({}, (err, result) => {
        //send results
        if (err) {
            res.send(err);
            console.log('Fail');
        }
        res.send(result);
    });
});

activityBookingRoutes.get("/listOne/:id", async (req, res) => {
    //search for all database results
    activityBookingModel.findById({_id: req.params.id}, (err, result) => {
        //send results
        if (err) {
            res.send(err);
            console.log('Fail');
        }
        res.send(result);
    });
});

//create a new activity booking
activityBookingRoutes.post("/createActivityBooking/:id", async (req, res) => {
    console.log(req.body.activityDate)
    const activityBooking = new activityBookingModel({
        activityBookingName: req.body.activityName,
        activityID:req.body._id,
        activityBookingQuantity:req.body.activityBookingQuantity,
        activityBookingCost:req.body.activityPrice,
        activityBookingDate:req.body.activityDate,
        isActivityPaid:true,
        isActivityCancelled:false,
    });
    //save new object database
    try {
        await activityBooking.save();
        console.log("saved");
        res.send("Peanuts");
    } catch (err) {
        console.log(err);
    }
}); 

//Edit an existing activity booking
activityBookingRoutes.put("/update", async (req, res) => {
    const id = req.body._id;
    console.log(id);
    let updatedActivityBooking= await activityBookingModel.findById(id);

if (!updatedActivityBooking)res.status400.json({ msg: "Activity booking was not updated" });

updatedActivityBooking.activityBookingName= req.body.activityBookingName,
updatedActivityBooking.activityID=req.body.activityID,
updatedActivityBooking.activityBookingQuantity=req.body.activityBookingQuantity,
updatedActivityBooking.activityBookingCost=req.body.activityBookingCost,
updatedActivityBooking.activityBookingDate=req.body.activityBookingDate,
updatedActivityBooking.isActivityPaid=true,
updatedActivityBooking.isActivityCancelled=false,
updatedActivityBooking.save();
res.send("Activity booking updated"); 
    
});

//delete an activity booking
activityBookingRoutes.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await activityBookingModel.findByIdAndRemove(id).exec();
    res.send("Activity booking deleted.")
});

module.exports = activityBookingRoutes;