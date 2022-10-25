import React from "react";
import { Route, Routes } from "react-router-dom";

//Pages
import Homepage from "./pages/homepage";
//Admin
import AdminLogin from "./pages/adminLogin";
import AdminDashboard from "./pages/adminDashboard";
//Accounts
import Accounts from "./pages/accounts";
//Daycare
import Daycare from "./pages/daycare";
//Rooms
import Rooms from "./pages/rooms";
//Activities
import Activities from "./pages/activities";


//Components
import Register from "./components/admin/login/register";
import ForgotPassword from "./components/admin/login/forgotPassword";
//Admin
import AdminCreate from "./components/admin/userManagement/adminCreate";
import AdminEdit from "./components/admin/userManagement/adminEdit";
//Accounts
import AccountManagement from "./components/accounts/view/accountManagement";
import RoomDetailView from "./components/rooms/roomDetailView";
import RoomAddView from "./components/rooms/roomAddView";
import RoomEditView from "./components/rooms/roomEditView";
import RoomBooking from "./components/rooms/booking/roomBooking";
import BookingEditView from "./components/rooms/booking/bookingEditView";
import PaymentOptions from "./components/accounts/view/payments";
import EditAccount from "./components/accounts/view/edit";
import EditCC from "./components/accounts/view/editCreditCard";
import EditPaypal from "./components/accounts/view/editPaypal";
import AddCC from "./components/accounts/view/addCreditCard";
import AddPaypal from "./components/accounts/view/addPaypal";
//Daycare
import DaycareShow from "./components/daycare/catalogue/showDaycare";
import CreateDaycare from "./components/daycare/catalogue/create";
import CreateDaycareBooking from "./components/daycare/history/create";
import Create from "./components/daycare/catalogue/create";
import Edit from "./components/daycare/catalogue/edit";
import DaycareHistory from "./components/daycare/history/daycareHistory";
import EditBooking from "./components/daycare/history/edit";
//Rooms
import Bookings from "./components/rooms/booking/bookings";
//Activities
import CreateActivity from "./components/activities/catalogue/CreateActivity";
import EditActivity from "./components/activities/catalogue/EditActivity";
import ActivityBooking from "./pages/activityBooking";
import CreateActivityBooking from "./components/activities/activityBooking/activityBookingCatalogue/CreateActivityBooking";
import EditActivityBooking from "./components/activities/activityBooking/activityBookingCatalogue/EditActivityBooking";



export default function CreateRoutes(props) {
  return (
    <Routes>
      <Route exact path="/" element={<AdminLogin />} />
      {/* admin */}
      <Route path="/components/adminLogin" element={<AdminLogin />} />
      <Route path="/components/adminDashboard" element={<AdminDashboard />} />
      <Route path="/components/register" element={<Register />} />
      <Route path="/components/forgotpassword" element={<ForgotPassword />} />
      <Route path="components/adminCreate" element={<AdminCreate />} />
      <Route path="components/adminEdit/:id" element={<AdminEdit />} />

      {/* account */}
      <Route path="/components/accounts" element={<Accounts />} />
      <Route path="/components/edit/:id" element={<EditAccount />} />
      <Route path="/components/payments/:id" element={<PaymentOptions />} />
      <Route
        path="/components/payments/editCreditCard/:id"
        element={<EditCC />}
      />
      <Route path="/components/payments/editPaypal/:id" element={<EditPaypal />} />
      <Route path="/components/payments/addCreditCard/:id" element={<AddCC />} />
      <Route path="/components/payments/addPaypal/:id" element={<AddPaypal />} />
      {/* <Route path="/accounts/view/creditCard" element={<CreditCard />} /> */}

      {/* daycare */}
      <Route path="/components/daycare" element={<Daycare />} />
      <Route path="/components/daycare/catalogue/showDaycare" element={<DaycareShow />} />
      <Route path="/components/daycare/catalogue/create" element={<Create />} />
      <Route path="/components/daycare/catalogue/edit" element={<Edit />} />
      <Route path="/components/daycare/catalogue/create" element={<CreateDaycare />} />
      <Route path="/components/daycare/history/create/:id" element={<CreateDaycareBooking />} />
      <Route path="/components/daycare/catalogue/edit/:id" element={<Edit />} />
      <Route path="/components/daycare/history/daycareHistory" element={<DaycareHistory />} />
      <Route path="/components/daycare/history/edit/:id" element={<EditBooking />} />

      {/* rooms */}
      <Route path="/components/rooms" element={<Rooms />} />
      <Route path="/components/rooms/roomdetailview/:id" element={<RoomDetailView />} />
      <Route path="/components/rooms/roomaddview" element={<RoomAddView />} />
      <Route path="/components/rooms/roomeditview/:id" element={<RoomEditView />} />
      <Route path="/components/rooms/roombooking/:id" element={<RoomBooking />} />
      <Route path="/components/rooms/bookings" element={<Bookings />} />
      <Route path="/components/bookings" element={<Bookings />} />
      <Route path="/components/bookingeditview/:id" element={<BookingEditView />}
      />

      {/* activities */}
      <Route path="/components/activities" element={<Activities />} />
      <Route path="/components/activities/createActivity" element={<CreateActivity />} />
      <Route path="/components/activities/editActivity/:id" element={<EditActivity />} />
      <Route path="/components/activityBooking" element={<ActivityBooking />} />
      <Route path="/components/activityBooking/createActivityBooking/:id" element={<CreateActivityBooking />} />
      <Route path="/components/activityBooking/editActivityBooking/:id" element={<EditActivityBooking />} />
    </Routes>
  );
}
