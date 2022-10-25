const express = require("express");

// adminRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const adminRoutes = express.Router();
const userModel = require("../schema/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoutes = require("./user");

// login endpoint
adminRoutes.post("/loginUser", async (req, res) => {
    // check if email exists
    // console.log(req.body.emailAddress)
    // console.log(req.body.password)
    try {
        let user = await userModel.findOne({ emailAddress: req.body.emailAddress })
        // console.log(user.firstName)
        // console.log(user.password)
        // console.log("passed the find")
        // console.log(user)
        // compare the password entered and the hashed password found
        let passwordCheck = await bcrypt.compare(req.body.password, user.password)
        // if the passwords match
        // check if password matches
        // console.log(req.body.password)
        // console.log(user.password)
        // console.log(passwordCheck)
        if (!passwordCheck) {
            return res.status(400).send({
                message: "Passwords do not match",
            });
        }
        // console.log("JWT Test")
        //create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                userEmail: user.emailAddress,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
        );
        //   return success response
        // console.log(token)
        return (res.status(200).send({
            message: "Login Successful",
            email: user.emailAddress,
            id: user.id,
            token,
        }));

        // catch error if password does not match
        // catch error if email does not exist
    }
    catch (err) {
        console.log(err)
    }
    // userModel.findOne({ emailAddress: req.body.emailAddress }, (err, obj) => { console.log("nice") })
    // if email exists
});

let auth = async (request, response, next) => {
    try {
        //   get the token from the authorization header
        const token = await request.headers.authorization.split(" ")[1];

        //check if the token matches the supposed origin
        const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

        // retrieve the user details of the logged in user
        const user = await decodedToken;

        // pass the user down to the endpoints here
        request.user = user;

        // pass down functionality to the endpoint
        next();

    } catch (error) {
        response.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
};

// free endpoint
userRoutes.get("/free-endpoint", (req, res) => {
    res.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
userRoutes.get("/auth-endpoint", auth, (req, res) => {
    res.json({ message: "You are authorized to access me" });
});


adminRoutes.post("/addUser", async (req, res) => {
    console.log("reached admin create API")

    let existingCheck = await userModel.findOne({
        emailAddress: req.body.emailAddress,
    });
    if (!existingCheck) {
        bcrypt.hash(req.body.password, 10)
            .then((hashedpassword) => {
                console.log(req.body.emailAddress)
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
                    profilePic: null,
                    userType: req.body.userType,
                });

                //save new object database
                try {
                    newUser.save();
                    console.log("saved");
                    res.status(200).send({
                        message: "User created!",
                    })
                } catch (err) {
                    console.log(err);
                }
            }
            )
            .catch((e) => {
                res.status(500).send({
                    message: "Password was not hashed successfully",
                    e,
                });
            });
    }
    else {
        console.log("failed to add cos of email duplicate");
        res.status(500).send({
            message: "An Account with this email address already exists",
        });
    }
});

adminRoutes.patch("/update/:id", async (req, res) => {
    console.log("edit reached")

    try {
        const user = await userModel.findOne({ _id: req.params.id })
        if (req.body.firstName) {
            user.firstName = req.body.firstName
        }
        if (req.body.lastName) {
            user.lastName = req.body.lastName
        }
        if (req.body.emailAddress) {
            user.emailAddress = req.body.emailAddress
        }
        if (req.body.phoneNumber) {
            user.phoneNumber = req.body.phoneNumber
        }
        if (req.body.password) {
            user.password = req.body.password
        }
        if (req.body.dob) {
            user.dob = req.body.dob
        }
        if (req.body.streetNumber) {
            user.streetNumber = req.body.streetNumber
        }
        if (req.body.streetName) {
            user.streetName = req.body.streetName
        }
        if (req.body.postcode) {
            user.postcode = req.body.postcode
        }
        if (req.body.userType) {
            user.userType = req.body.userType
        }
        try {
            await user.save()
            console.log("Saved");
            res.send({ message: "Edit Successful" })
        } catch (err) {
            console.log(err);
        }
    } catch {
        res.status(404)
        res.send({ message: "User doesn't exist!" })
    }

})


adminRoutes.delete("/delete/:id", async (req, res) => {
    console.log("Delete API Reached")
    // console.log(req.query(deletingUser))
    console.log(`Deleting ${req.body.id}`)
    try {
        const user = await userModel.findOne({ _id: req.body.id })
        await userModel.deleteOne({ _id: req.body.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ message: "User doesn't exist!" })
    }
})



module.exports = adminRoutes;
