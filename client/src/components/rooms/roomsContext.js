import React, { createContext, useState, useEffect } from "react";

export const RoomsContext = createContext({});

export const RoomsProvider = (props) => {
  const [allRooms, setAllRooms] = useState([]);
  const [isEmployee, setIsEmployee] = useState(false);

  useEffect(() => {
    async function getRooms() {
      const response = await fetch("http://localhost:5000/room/listAll");
      if (!response.ok) {
        console.log("error");
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const rooms = await response.json();
      setAllRooms(rooms);
    }
    getRooms();
  }, [allRooms.length]);

  return (
    <RoomsContext.Provider
      value={{
        allRooms,
        setAllRooms,
        isEmployee,
        setIsEmployee,
      }}
    >
      {props.children}
    </RoomsContext.Provider>
  );
};
