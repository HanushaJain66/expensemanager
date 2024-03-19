import React, { useState, useEffect } from "react";
import "./Date.css";
import "./Daily.css";

function DateBar({ counter, setCounter, userId,result}) {
  const [balance, setBalance] = useState(0);
  const next = () => {
    setCounter(counter + 1);
  };
  const prev = () => {
    setCounter(counter - 1);
  };

  const [date, setDate] = useState([[], []]);
  useEffect(() => {
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        "SELECT to_char(SYSDATE),to_char(SYSDATE+" +
          counter +
          "),to_char(SYSDATE+" +
          counter +
          ",'DAY') FROM DUAL"
      ),
    })
      .then((response) => response.json())
      .then((data) => {
        setDate(data);
        if (data[0][1] == data[0][0]) {
          document.getElementById("date").style.border = "2px solid white";
          document.getElementById("date").style.borderRadius = "5px";
        } else {
          document.getElementById("date").style.border = "none";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [counter,result]);

  useEffect(()=>{
    fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          "SELECT SUM(BALANCE) FROM DEFAULT_ACCOUNT WHERE USER_ID='"+userId+"'"
        ),
      }) // Update with your actual endpoint
        .then((response) => response.json())
        .then((data) => {
          if (data[0][0] != null) {
            setBalance(data);
          } else {
            setBalance(0);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  },[result])

  return (
    <div id="date-box">
      <div id="left-date-box">
        <button id="left-arrow" onClick={prev}>
          ≺
        </button>
        <span id="date">{(window.innerWidth>1000)?(date[0][1] + ", " + date[0][2]):(date[0][1])}</span>
      </div>
      <div id="right-date-box">
        <span id="daily-total">{"Total: ₹" + balance}</span>
        <button id="right-arrow" onClick={next}>
          ≻
        </button>
      </div>
    </div>
  );
}
export default DateBar;
