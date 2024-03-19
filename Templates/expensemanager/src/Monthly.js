import React, { useState, useEffect } from 'react';
import './Monthly.css';
import './RecordForm.css';
import './Monthlyexpense.css';
function Monthly({ userId, month }) {
    const [monData, setData] = useState({});
    const [keys, setKeys] = useState([]);
    let sum = 0

    useEffect(() => {
        if (month) {
            fetch("/monthly", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify("SELECT TRANSICTION_ID,TITLE,AMOUNT,TO_CHAR(TRANSICTION_DATE, 'DD-MM-YYYY') FROM DEFAULT_INCOME WHERE to_char(EXTRACT(MONTH FROM TRANSICTION_DATE))='" + month + "' and USER_ID='" + userId + "'"),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("data", data)
                    setData(data);
                    const key = Object.keys(data);
                    setKeys(key)
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [month, userId]);

    return (
        <div id='monthly-box'>
            {(keys.length > 0) ? (keys.map((row) => {
                sum = 0
                return (
                        <div className="Income"key={row}>
                            <div className="date">{monData[row][0][3]}</div>
                            {monData[row].map((i) => {
                                { sum = (sum + i[2]) }
                                return <div className="title_amount" key={i[0]}>{i[1]}<span id="amount" style={{color:'white'}}>{'₹ ' + i[2]}</span></div>
                            })}
                            <div className="title_amount sum" style={{color:'rgb(3, 255, 3)'}}>Total: <span id="amount" style={{color:'rgb(3, 255, 3)'}}>{'₹ ' + sum}</span></div>
                        </div>
                )
            })) : <div className='no-record'>No Income Record Found</div>}
        </div>
    );
}

export default Monthly;
