const express = require("express");
const ccRoute = express.Router();
const ccModel = require("../schema/creditcard.model");

//Create one User
ccRoute.post("/add/:id", async (req, res) => {
    const cc = new ccModel({
        userID: req.params.id,
        cardNumber: req.body.cardNumber,
        expiryDate: req.body.expiryDate,
        holderName: req.body.holderName,
        cvv: req.body.cvv
    });
    //save new object database
    try {
        await cc.save();
        console.log("Saved");
        res.send("Peanuts");
    } catch (err) {
        console.log(err);
    }
});

//Read all CreditCards linked to one Custoemr
ccRoute.get("/listAll/:id", async (req, res) => {
    ccModel.find({ userID: req.params.id }, (err, result) => {
        if (err) {
            res.send(err);
            console.log('Fail');
        }
        res.send(result);
    })
});

//Read one CreditCard 
ccRoute.get("/list/:id", async (req, res) => {
    ccModel.findOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            res.send(err);
            console.log('Fail');
        }
        res.send(result);
    })
});

//Update one Credit Card
ccRoute.patch("/update/:id", async (req, res) => {
    try {
        const cc = await ccModel.findOne({ _id: req.params.id })
        if (req.body.cardNumber) {
            cc.cardNumber = req.body.cardNumber
        }
        if (req.body.expiryDate) {
            cc.expiryDate = req.body.expiryDate
        }
        if (req.body.holderName) {
            cc.holderName = req.body.holderName
        }
        if (req.body.cvv) {
            cc.cvv = req.body.cvv
        }
        try {
            await cc.save()
            console.log("Saved");
            res.send(cc)
        } catch (err) {
            console.log(err);
        }
    } catch {
        res.status(404)
        res.send({ error: "Credit Card doesn't exist!" })
    }
})

//Delete one Credit Card
ccRoute.delete("/delete/:id", async (req, res) => {
    try {
        await ccModel.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Credit Card doesn't exist!" })
    }
})

module.exports = ccRoute;