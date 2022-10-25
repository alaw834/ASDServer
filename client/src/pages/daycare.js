// We import bootstrap to make our application look better.
import { useNavigate, NavLink, Link, useRouteLoaderData } from "react-router-dom";
import React, { useEffect, useState, useContext, createContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { DaycareContext, DaycareProvider } from "../components/daycare/daycareContext";


// Here, we display our Navbar
export default function Daycare(props) {
    let navigate = useNavigate();

    // const { currentDaycareList } = useContext(DaycareContext);
    // console.log(currentDaycareList);

    const [currentDaycareList, setcurrentDaycareList] = useState([]);
    const DaycareContext = createContext({});

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/daycare/listAllDaycare`);

            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setcurrentDaycareList(records);
        }

        getRecords();
        console.log(currentDaycareList);


        return;
    }, [currentDaycareList.length]);


    const [currentDaycare, setCurrentDaycare] = useState(currentDaycareList[0]);

    async function deleteDaycare(item) {
        if (window.confirm("Are you sure you want to delete Daycare service " + item._id + " : " + item.daycareName)) {
            await fetch(`http://localhost:5000/daycare/delete/${item._id}`, {
                method: "DELETE"
            });
            alert("Daycare " + item._id + " : " + item.daycareName + " has been deleted.");
            window.location.reload();
        }
        else {
            alert("Daycare " + item._id + " : " + item.activityName + " has not been deleted.")
        }
    }


    return (
        <div>
            <DaycareContext.Provider
                value={{
                    currentDaycare,
                    setCurrentDaycare,
                    currentDaycareList,
                    setcurrentDaycareList
                }}
            >
                {props.children}
            </DaycareContext.Provider>
            <div>
                <div className="container">
                    <h1>Daycare</h1>
                    <button className="btn btn-secondary btn-lg btn-block"><a onClick={() => { handleHistory() }}>My booking history</a></button>

                    <div className="row mt-5 p-2 justify-content-around">
                        {React.Children.toArray(currentDaycareList.map(d => {
                            return (
                                <>
                                    <div className="col-3 m-2 text-center">
                                        <div className="row p-3">
                                            <h3>{d.daycareName}</h3>

                                            <img src={getImage(d)} alt={getImage(d)} className="rounded mx-auto d-block" />
                                            <p>{d.daycareType}</p>
                                            <p>{d.daycareDescription}</p>
                                            <button className="btn btn-secondary btn-lg "><a onClick={() => { handleShow(d) }}>Select</a></button>
                                            <Link to={'/components/daycare/catalogue/edit/' + d._id}><button className="btn btn-secondary btn-lg ">Edit</button></Link>
                                            <button className="btn btn-secondary btn-lg"><a onClick={() => { deleteDaycare(d) }}>Delete</a></button>

                                        </div>
                                    </div>

                                </>
                            )
                        }))}

                    </div>

                    <a onClick={() => { navigate('/components/daycare/catalogue/create') }}>Create (STAFF)</a>
                </div>

            </div>
        </div>

    );



    function handleHistory() {
        navigate('/components/daycare/history/daycareHistory',
            {

            })
    }

    function handleShow(item) {
        navigate('/components/daycare/catalogue/showDaycare',
            {
                state:
                {
                    id: item._id,
                    name: item.daycareName,
                    type: item.daycareType,
                    description: item.daycareDescription,
                    price: item.daycarePrice,
                    capacity: item.daycareCapacity,
                    img: getImage(item)
                }
            })

    }


    function getImage(item) {
        if (item.daycareType == "Care Centre")
            return "https://drive.google.com/uc?export=view&id=1TfijHk80cYUu7Nl7cp0XU8PsqiOi0e7v";

        else if (item.daycareType == "Excursion")
            return "https://drive.google.com/uc?export=view&id=1qI9lRnNSpcc9UdiecEsc9MbL691uhWUN";

        else
            return "https://drive.google.com/uc?export=view&id=1qJ_tJQs120xHIlAz1LB9C4b8jx_51mAe";
    }

    function handleCreate(item) {
        let newDC = { daycareID: item.daycareID, daycareName: item.daycareName, daycareType: item.daycareType, daycareDescription: item.daycareDescription, daycareCapacity: item.daycareCapacity, daycarePrice: item.daycarePrice };
        currentDaycareList.push(newDC);
    }
    //console.log("daycare " + currentDaycareList.length);


}