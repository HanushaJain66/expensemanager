import React, { useState, useEffect } from 'react'
import './Expense.css'
import './Record.css'
import './Daily.css'
import icon from './img/EC0.png'

function Expense({ counter, exTotal, userId, result }) {
    const [exData, setData] = useState([[], []])

    useEffect(() => {
        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify("SELECT E.TRANSICTION_ID,E.TITLE,E.AMOUNT,D.ACCOUNT_NAME,E.DESCRIPTION,U.USER_NAME FROM DEFAULT_EXPENSE E JOIN DEFAULT_ACCOUNT D ON E.ACCOUNT_ID=D.ACCOUNT_ID AND E.USER_ID=D.USER_ID LEFT JOIN USER_DATA U ON E.SENT_TO=U.USER_ID WHERE to_char(E.TRANSICTION_DATE) = to_char(SYSDATE+" + counter + ") AND E.USER_ID='" + userId + "' ORDER BY E.TRANSICTION_DATE"),
        }) // Update with your actual endpoint
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [counter,result]);
    return (
        <div id='expense-box'>
            <div id='expense-title'>Total Expense<span id='ex-total'>{'₹ ' + exTotal}</span></div>
            <div className='record-list'>{(exData.length > 0) ? exData.map((row) => {
                
                return (
                    <div key={row[0]} className='record'>
                        <div className='record-left'>
                            <span className='record-first-line'>
                                <img src={icon} className='record-img' />
                                <span className='record-title'>{row[1]}</span>
                                <span className='record-ac'>{row[3]}</span>
                            </span>
                            <div className='record-desc'>{row[4]}</div>
                        </div>
                        <div>
                            <div className='record-amount'>{'₹ '+row[2]}</div>
                            <div className='record-to'>{(row[5]!=null)?'to '+row[5]:''}</div>
                        </div>
                    </div>
                )
            }) : <div className='no-record'>Enter Expense Record</div>}
            </div>
        </div>
    )
}
export default Expense;