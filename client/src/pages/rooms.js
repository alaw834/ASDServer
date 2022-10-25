import React from "react";

import RoomsView from "../components/rooms/roomsView";
import { RoomsProvider } from "../components/rooms/roomsContext";

const Rooms = () => {
  return (
    <div>
      <RoomsProvider>
        <RoomsView />
      </RoomsProvider>
    </div>
  );
};
export default Rooms;
