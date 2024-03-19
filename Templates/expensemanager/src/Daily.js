import React, { useEffect, useState } from "react";
import Expense from "./Expense";
import Income from "./Income";
import DateBar from "./Date";
import BalanceBar from "./BalanceBar";
import EntryForm from './EntryForm';
import "./Daily.css";

function Daily({ userId }) {
    const [counter, setCounter] = useState(0)
    const [inTotal, setInTotal] = useState(0)
    const [exTotal, setExTotal] = useState(0)
    const [result, setResult] = useState('')

    useEffect(() => {
        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify("SELECT SUM(AMOUNT) FROM DEFAULT_INCOME WHERE to_char(TRANSICTION_DATE) = to_char(SYSDATE+" + counter + ") AND USER_ID='" + userId + "'"),
        })
            .then(response => response.json())
            .then(data => {
                if (data[0][0] != null) {
                    setInTotal(data);
                } else {
                    setInTotal(0);
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
            body: JSON.stringify("SELECT SUM(AMOUNT) FROM DEFAULT_EXPENSE WHERE to_char(TRANSICTION_DATE) = to_char(SYSDATE+" + counter + ") AND USER_ID='" + userId + "'"),
        })
            .then(response => response.json())
            .then(data => {
                if (data[0][0] != null) {
                    setExTotal(data);
                } else {
                    setExTotal(0);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, [counter,result])
    return (
        <>
            <EntryForm counter={counter} userId={userId} result={result} setResult={setResult}/>
            <DateBar counter={counter} setCounter={setCounter} userId={userId} result={result}/>
            {/* <BalanceBar/> */}
            <div id="daily-box">
                <Income counter={counter} inTotal={inTotal} userId={userId} result={result} />
                <Expense counter={counter} exTotal={exTotal} userId={userId} result={result} />
            </div>
        </>
    );
}
export default Daily;
