// import React, { createContext, useState, useEffect } from "react";

// export const DaycareContext = createContext({});

// export const DaycareProvider = (props) => {

//     const [currentDaycareList, setcurrentDaycareList] = useState([]);

//     useEffect(() => {
//         async function getRecords() {
//             const response = await fetch(`http://localhost:5000/daycare/listAll`);

//             if (!response.ok) {
//                 const message = `An error occured: ${response.statusText}`;
//                 window.alert(message);
//                 return;
//             }

//             const records = await response.json();
//             setcurrentDaycareList(records);
//         }

//         getRecords();

//         return;
//     }, [currentDaycareList.length]);


//     const [currentDaycare, setCurrentDaycare] = useState(currentDaycareList[0]);

//     return (
//         <DaycareContext.Provider
//             value={{
//                 currentDaycare,
//                 setCurrentDaycare,
//                 currentDaycareList,
//                 setcurrentDaycareList
//             }}
//         >
//             {props.children}
//         </DaycareContext.Provider>
//     );
// };