const express = require("express");
const userRoutes = express.Router();
const userModel = require("../schema/user.model");
const bcrypt = require('bcrypt')
//Create one User
userRoutes.post("/addUser", async (req, res) => {
  // console.log("/user/addUser reached")
  //check if user already exists with that email
  let existingCheck = await userModel.findOne({
    emailAddress: req.body.emailAddress,
  });

  if (!existingCheck) {
    bcrypt.hash(req.body.password, 10)
      .then((hashedpassword) => {
        console.log(req.body.emailAddress);
        const newUser = new userModel({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          emailAddress: req.body.emailAddress,
          password: hashedpassword,
          phoneNumber: req.body.phoneNumber,
          dob: req.body.dob,
          streetNumber: req.body.streetNumber,
          streetName: req.body.streetName,
          postcode: req.body.postcode,
          registeredDate: Date.now(),
          profilePic:
            "https://cdn.discordapp.com/emojis/820240834871820298.webp?size=96&quality=lossless",
          userType: "Customer",
        });

        //save new object database
        try {
          newUser.save();
          console.log("saved");
          res.send({ message: "Registration Successful!" });
        } catch (err) {
          console.log(err);
        }
      })
      .catch((e) => {
        res.status(500).send({
          message: "Password was not hashed successfully",
          e,
        });
      });
  } else {
    console.log("failed to add cos of email duplicate");
    res.status(500).send({
      message: "An Account with this email address already exists",
    });
  }
});

//Read all Users
userRoutes.get("/listAll", async (req, res) => {
  //search for all database results
  userModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
      console.log("Fail");
    }
    res.send(result);
  });
});

//Read one User by ID
userRoutes.get("/listUser/:id", async (req, res) => {
  userModel.findById({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.send(err);
      console.log("Fail");
    }
    res.send(result);
  });
});

//Update one User
userRoutes.patch("/update/:id", async (req, res) => {
  console.log("edit reached");
  try {
    const user = await userModel.findOne({ _id: req.params.id });
    if (req.body.firstName) {
      user.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      user.lastName = req.body.lastName;
    }
    if (req.body.emailAddress) {
      user.emailAddress = req.body.emailAddress;
    }
    if (req.body.phoneNumber) {
      user.phoneNumber = req.body.phoneNumber;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.dob) {
      user.dob = req.body.dob;
    }
    if (req.body.streetNumber) {
      user.streetNumber = req.body.streetNumber;
    }
    if (req.body.streetName) {
      user.streetName = req.body.streetName;
    }
    if (req.body.postcode) {
      user.postcode = req.body.postcode;
    }
    try {
      await user.save();
      console.log("Saved");
      res.send(user);
    } catch (err) {
      console.log(err);
    }
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

//Delete one User
userRoutes.delete("/delete/:id", async (req, res) => {
  try {
    await userModel.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

module.exports = userRoutes;
