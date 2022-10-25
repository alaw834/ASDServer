const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const daycareRoutes = express.Router();

const daycareModel = require("../schema/daycare.model");


//get all daycare 
daycareRoutes.get("/listAllDaycare", async (req, res) => {
    //search for all database results
    daycareModel.find({}, (err, result) => {
        //send results
        if (err) {
            res.send(err);
            console.log('Fail');
        }
        res.send(result);
    });
});

daycareRoutes.get("/listOneDaycare/:id", async (req, res) => {
    //search for all database results
    daycareModel.findById({_id: req.params.id}, (err, result) => {
        //send results
        if (err) {
            res.send(err);
            console.log('Fail');
        }
        res.send(result);
    });
});

daycareRoutes.post("/addDaycare", async (req, res) => {
    const daycare = new daycareModel({
        daycareName: req.body.daycareName,
        daycareType: req.body.daycareType,
        daycareDescription: req.body.daycareDescription,
        daycareCapacity: req.body.daycareCapacity,
        daycarePrice:req.body.daycarePrice

    });
    //save new object database
    try {
        await daycare.save();
        console.log("saved");
        res.send("Peanuts");
    } catch (err) {
        console.log(err);
    }
}); 

daycareRoutes.put("/update", async (req, res) => {
    //get values from form from daycare list page
    const id = req.body._id;

    let updatedDaycare= await daycareModel.findById(id);

if (!updatedDaycare)res.status400.json({ msg: "Error" });

updatedDaycare.daycareName = req.body.daycareName,
updatedDaycare.daycareType= req.body.daycareType,
updatedDaycare.daycareDescription= req.body.daycareDescription,
updatedDaycare.daycareCapacity= req.body.daycareCapacity
updatedDaycare.daycarePrice= req.body.daycarePrice,
updatedDaycare.save();
res.send("update"); 
    
});

daycareRoutes.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await daycareModel.findByIdAndRemove(id).exec();
    res.send("test")
});

module.exports = daycareRoutes;
