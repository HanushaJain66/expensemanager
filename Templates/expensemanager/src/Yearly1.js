import React, { useState, useEffect } from 'react'
import Hanu from './Yearly'

function Yearly1({inTotal, userId, result }) {
    const [inData, setData] = useState([[]])
    const months = ['January','February','March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    useEffect(() => {
        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify("SELECT SUM(AMOUNT),to_char(extract(MONTH FROM TRANSICTION_DATE)) FROM DEFAULT_INCOME WHERE to_char(EXTRACT(YEAR FROM TRANSICTION_DATE)) = '2023' AND USER_ID='"+userId+"'group by to_char(extract(MONTH FROM TRANSICTION_DATE)) order by to_char(extract(MONTH FROM TRANSICTION_DATE))")
        })
            .then(response => response.json())
            .then(data => {

                setData(data)
                console.log(setData)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <div id='yearly-income'>
            <div id='income-title'>Total Income<span id='in-total'>{'₹ ' + inTotal}</span></div>
            <div className='income-container-heading'>
                            <div className='yearly-record-line'>Month</div>
                            <div className='yearly-record-line'>Total Amount</div>
                 </div>
            <div className='record-list'>{(inData.length > 0) ? inData.map((row) => {

                return (
                   <div className='income-container'>
                            <div className='yearly-record-line'>{months[row[1]-1]}</div>
                            <div className='yearly-record-line'>{row[0]}</div>
                    </div>
                )

            }) : <div className='no-record'>Enter Income Record</div>}
            </div>
        </div>

    )
}

export default Yearly1
