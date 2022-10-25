const express = require("express");
const paymentRoutes = express.Router();
const paymentModel = require("../schema/paymentoption.model");

//Create one User
paymentRoutes.post("/add/:id", async (req, res) => {
    const option = new paymentModel({
        userID: req.params.id,
        paymentType: req.body.paymentType,
    });
    //save new object database
    try {
        await option.save();
        console.log("Saved");
        res.send("Peanuts");
    } catch (err) {
        console.log(err);
    }
});

//Read linked payments a customer has
paymentRoutes.get("/list/:id", async (req, res) => {
    paymentModel.find({ "userID": { _id: req.params.id } }, (err, result) => {
        //send results
        if (err) {
            res.send(err);
            console.log('Fail');
        }
        res.send(result);
    })
});

paymentRoutes.delete("/delete/:id", async (req, res) => {
    try {
        await paymentModel.deleteOne({ "userID": { _id: req.params.id }, paymentType: req.body.type })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
})

module.exports = paymentRoutes;