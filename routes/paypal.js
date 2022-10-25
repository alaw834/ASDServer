const express = require("express");
const paypalRoutes = express.Router();
const paypalModel = require("../schema/paypal.model");

//Create one User
paypalRoutes.post("/add/:id", async (req, res) => {
    const paypal = new paypalModel({
        userID: req.params.id,
        paypalUsername: req.body.paypalUsername,
    });
    //save new object database
    try {
        await paypal.save();
        console.log("Saved");
        res.send("Peanuts");
    } catch (err) {
        console.log(err);
    }
});

//Read all Paypal linked to one Custoemr
paypalRoutes.get("/listAll/:id", async (req, res) => {
    paypalModel.find({ userID: req.params.id }, (err, result) => {
        if (err) {
            res.send(err);
            console.log('Fail');
        }
        res.send(result);
    })
});

//Read one Paypal 
paypalRoutes.get("/list/:id", async (req, res) => {
    paypalModel.findOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            res.send(err);
            console.log('Fail');
        }
        res.send(result);
    })
});

//Update one Paypal
paypalRoutes.patch("/update/:id", async (req, res) => {
    try {
        const paypal = await paypalModel.findOne({ _id: req.params.id })
        if (req.body.paypalUsername) {
            paypal.paypalUsername = req.body.paypalUsername
        }
        try {
            await paypal.save()
            console.log("Saved");
            res.send(paypal)
        } catch (err) {
            console.log(err);
        }
    } catch {
        res.status(404)
        res.send({ error: "Paypal doesn't exist!" })
    }
})

paypalRoutes.delete("/delete/:id", async (req, res) => {
    try {
        await paypalModel.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Paypal doesn't exist!" })
    }
})

module.exports = paypalRoutes;