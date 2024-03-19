import React from 'react'
import Yearly1 from "./Yearly1"
import Yearly2 from "./Yearly2"
import './Yearly.css'
import { useEffect, useState } from 'react'

function Yearly({ userId }) {
    const [inTotal, setInTotal] = useState(0)
    const [exTotal, setExTotal] = useState(0)
    const [result, setResult] = useState('')

    useEffect(() => {
        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify("SELECT SUM(AMOUNT) FROM DEFAULT_INCOME WHERE to_char(EXTRACT(YEAR FROM TRANSICTION_DATE)) = '2023' AND USER_ID='" + userId + "'")
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
            body: JSON.stringify("SELECT SUM(AMOUNT) FROM DEFAULT_EXPENSE WHERE to_char(EXTRACT(YEAR FROM TRANSICTION_DATE)) = '2023' AND USER_ID='" + userId + "'")
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data[0][0] != null) {
                    setExTotal(data[0]);
                } else {
                    setExTotal(0);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        // setResult(result);
    }, [result])
    return (
        <div id='yearly-box'>
            <div id='Yearly-records'>
                <h2>Yearly Details</h2>
            </div>
            <div id='yearly-data-box'>
                <Yearly1 inTotal={inTotal} userId={userId} result={result} />
                <Yearly2 exTotal={exTotal} userId={userId} result={result} />
            </div>
        </div>
    )
}

export default Yearly
