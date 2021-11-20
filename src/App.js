import React, { useEffect, useState } from "react";
import "./App.css";
//Json
import doors from "./json/doors.json";

function App() {
  const [isOpen, setIsOpen] = useState([]);
  const [submitToStorage, setSubmitToStorage] = useState([]);
  // Check if we are allowed to open the door.
  const checkIfAllowedToOpen = (inputdate) => {
    const doordate = new Date(inputdate);
    const today = new Date();

    today >= doordate
      ? openDoor(inputdate)
      : alert(
          "He knows if you've been bad or good So be good for goodness' sake. Not allowed to open yet, wait a few days"
        );
  };

  const openDoor = (doordate) => {
    setSubmitToStorage([...isOpen, doordate]);
    localStorage.setItem("isOpen", submitToStorage);
  };

  const converDateToDay = (inputdate) => {
    const date = new Date(inputdate);
    const day = date.getDate();

    return day;
  };

  const resetDoors = () => {
    setSubmitToStorage([]);
    localStorage.removeItem("isOpen");
  };

  useEffect(() => {
    const local = localStorage.getItem("isOpen");
    setIsOpen(local ? local : []);
  }, [submitToStorage]);

  return (
    <div className="container">
      <div className="content">
        <div className="calendar">
          {doors.map((door, i) => {
            return (
              <div key={i}>
                {isOpen.includes(door.day) ? (
                  <div className="dooropen">
                    <p>{door.message}</p>
                  </div>
                ) : (
                  <div
                    className="door"
                    onClick={() => checkIfAllowedToOpen(door.day)}
                  >
                    <p>{converDateToDay(door.day)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button onClick={resetDoors}>Reset doors</button>
      </div>
    </div>
  );
}

export default App;
