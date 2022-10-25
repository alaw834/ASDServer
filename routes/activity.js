const express = require("express");

const activityRoutes = express.Router();

const activityModel = require("../schema/activity.model");

activityRoutes.get("/listAll", async (req, res) => {
    //search for all database results
    activityModel.find({}, (err, result) => {
        //send results
        if (err) {
            res.send(err);
            console.log('Fail');
        }
        res.send(result);
    });
});

activityRoutes.get("/listOne/:id", async (req, res) => {
    //search for all database results
    activityModel.findById({_id: req.params.id}, (err, result) => {
        //send results
        if (err) {
            res.send(err);
            console.log('Fail');
        }
        res.send(result);
    });
});

//add an activity
activityRoutes.post("/addActivity", async (req, res) => {
    const activity = new activityModel({
        activityName: req.body.activityName,
        activityType: req.body.activityType,
        activityPrice: req.body.activityPrice,
        activityDescription: req.body.activityDescription,
        activityCapacity: req.body.activityCapacity,
        activityDate:req.body.activityDate

    });
    //save new object database
    try {
        await activity.save();
        console.log("saved");
        res.send("Peanuts");
    } catch (err) {
        console.log(err);
    }
}); 

//update a current activity
activityRoutes.put("/update", async (req, res) => {
    //get values from form from activity list page
    const id = req.body._id;

    let updatedActivity= await activityModel.findById(id);

if (!updatedActivity)res.status400.json({ msg: "Activity not updated" });

updatedActivity.activityName = req.body.activityName,
updatedActivity.activityType= req.body.activityType,
updatedActivity.activityPrice= req.body.activityPrice,
updatedActivity.activityDescription= req.body.activityDescription,
updatedActivity.activityCapacity= req.body.activityCapacity
updatedActivity.save();
res.send("update"); 
    
});

//delete an activity
activityRoutes.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await activityModel.findByIdAndRemove(id).exec();
    res.send("test")
});

module.exports = activityRoutes;