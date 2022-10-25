import React, { createContext, useState ,useEffect} from "react";

export const ActivityBookingContext = createContext({});

export const ActivityBookingProvider = (props) => {

  const [currentActivityBookingList, setcurrentActivityBookingList] = useState([]);

  //retrieve all bookings from db
  useEffect(() => {
    async function getActivityBookings() {
      const response = await fetch(`http://localhost:5000/activityBooking/listAll`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setcurrentActivityBookingList(records);
    }
    getActivityBookings();

    return; 
  }, [currentActivityBookingList.length]);


  return (
    <ActivityBookingContext.Provider
      value={{
       currentActivityBookingList, setcurrentActivityBookingList
      }}
    >
      {props.children}
    </ActivityBookingContext.Provider>
  );
};
