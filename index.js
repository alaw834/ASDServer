const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
const CONNECTION_STRING = 'mongodb+srv://Admin:uPRqzicrKYFGjjIF@hotelmanagement1.p5skvzt.mongodb.net/HotelManagement?retryWrites=true&w=majority';

// const customerRoute = require("./routes/customer")
// app.use("/accounts", customerRoute);

const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const roomRoute = require("./routes/room");
const bookingRoute = require("./routes/booking");
const paymentOptionRoute = require("./routes/paymentOption");
const paypalRoute = require("./routes/paypal");
const creditCard = require("./routes/creditCard");
const activityRoute = require('./routes/activity');
const activityBookingRoutes = require("./routes/activityBooking");
const daycareRoute = require("./routes/daycare");
const daycareBookingRoute = require("./routes/daycareBooking");

// const activityRoute = require('./routes/activity')
// app.use('/activities', activityRoute);


app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/room", roomRoute);
app.use("/booking", bookingRoute);
app.use("/paymentOption", paymentOptionRoute);
app.use("/paypal", paypalRoute);
app.use("/creditcard", creditCard);
app.use("/activities", activityRoute);
app.use("/activitybooking", activityBookingRoutes);
app.use("/daycare", daycareRoute);
app.use("/daycareBooking", daycareBookingRoute);

//const dbo = require("./db/conn");

app.use(express.static("build"));

app.get('/', (req,res) => {
  res.send('APP IS RUNNING');
})

// get driver connection
mongoose
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
