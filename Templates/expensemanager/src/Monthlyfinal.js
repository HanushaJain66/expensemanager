import React, { useEffect, useState } from "react";
import "./Monthlyfinal.css";
import Monthly from "./Monthly";
import Monthlyexpense from "./Monthlyexpense";
function Monthlyfinal({ userId }) {
    const [inTotal, setInsum] = useState(0);
    const [exTotal, setExsum] = useState(0);
    const [month, setMonth] = useState('');
    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    }
    useEffect(() => {
        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify("SELECT SUM(amount) FROM DEFAULT_EXPENSE WHERE to_char(EXTRACT(MONTH FROM TRANSICTION_DATE))='" + month + "' and USER_ID='" + userId + "'"),
        })
            .then(response => response.json())
            .then(data => {
                if (data[0][0] != null) {
                    setExsum(data);
                } else {
                    setExsum(0);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify("SELECT SUM(amount) FROM DEFAULT_INCOME WHERE to_char(EXTRACT(MONTH FROM TRANSICTION_DATE))='" + month + "' and USER_ID='" + userId + "'"),
        })
            .then(response => response.json())
            .then(data => {
                if (data[0][0] != null) {
                    setInsum(data);
                } else {
                    setInsum(0);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, [])
    return (
        <>
            <div className="main">
                <div id='Yearly-records'>
                    <h2>Monthly Details</h2>
                </div>
                <div className="month-select" name="month">
                    <select value={month} onChange={handleMonthChange} id="selectmon">
                        <option value="" disabled>Select Month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
                <div className="ie">
                    <div className="component_name">
                        <div className="income">Income(Credit)<span id="incometot">{'₹ ' + inTotal}</span></div>
                        <Monthly month={month} userId={userId} />
                    </div>
                    <div className="component">
                        <div className="expense">Expense(Debit)<span id="expensetot">{'₹ ' + exTotal}</span></div>
                        <Monthlyexpense month={month} userId={userId} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Monthlyfinal;
