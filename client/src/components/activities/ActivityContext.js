import React, { createContext, useState ,useEffect} from "react";

export const ActivityContext = createContext({});

export const ActivitiesProvider = (props) => {

  const [currentActivityList, setcurrentActivityList] = useState([]);

  //retrieve all activities from the db
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/activities/listAll`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setcurrentActivityList(records);
    }

    getRecords();

    return; 
  }, [currentActivityList.length]);


  const [currentActivity, setCurrentActivity] = useState(currentActivityList[0]);

  return (
    <ActivityContext.Provider
      value={{
        currentActivity,
        setCurrentActivity,
        currentActivityList,
        setcurrentActivityList
      }}
    >
      {props.children}
    </ActivityContext.Provider>
  );
};
