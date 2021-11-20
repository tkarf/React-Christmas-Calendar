import React, { useEffect, useState } from "react";
import "./App.css";
//Json file that holds our door data. Could be changed to a database connection instead if prefered.
import doors from "./json/doors.json";

// Want to try a door and se what it looks like? Change the date to todays date.
// Viewing this another year, change the dates in doors.json in json map

function App() {
  // isOpen - the variable wich our localstorage item is saved to.
  const [isOpen, setIsOpen] = useState([]);
  // State wich is used as variable when saving to localstorage. Also used as a variable
  // for useEffect to detect change
  const [submitToStorage, setSubmitToStorage] = useState([]);

  // Check if we are allowed to open the door. If the date has passed or not.
  // if true then call openDoor function. Else alert with message that you want.
  // or null if you prefer that
  const checkIfAllowedToOpen = (inputdate) => {
    const doordate = new Date(inputdate);
    const today = new Date();

    today >= doordate
      ? openDoor(inputdate)
      : alert(
          "He knows if you've been bad or good So be good for goodness' sake. Not allowed to open yet, wait a few days"
        );
  };

  // Open the door and saves which doors have been opened to localstorage.
  // Also changes the setSubmitToStorage state to detect changes.
  const openDoor = (doordate) => {
    setSubmitToStorage([...isOpen, doordate]);
    localStorage.setItem("isOpen", submitToStorage);
  };

  // Convert the json date format (string) to date to compare to today's date.
  const converDateToDay = (inputdate) => {
    const date = new Date(inputdate);
    const day = date.getDate();

    return day;
  };

  // Remove the item from localstorage and that way resets the doors.
  const resetDoors = () => {
    setSubmitToStorage([]);
    localStorage.removeItem("isOpen");
  };

  // Initial fetch of localstorage.
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
        <button className="resetbutton" onClick={resetDoors}>
          Reset doors
        </button>
      </div>
    </div>
  );
}

export default App;
