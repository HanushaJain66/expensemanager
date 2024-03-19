import React, { useState,useEffect } from 'react'
import Yearly from './Yearly';


function YearlyExpense({exTotal,userId,result}) {
    const [inData,setData] = useState([[]])
    useEffect(() => {
        fetch('/api',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify("SELECT I.TRANSICTION_ID,I.TITLE, I.AMOUNT, D.ACCOUNT_NAME, I.CATEGORY, U.USER_NAME,to_char(EXTRACT(MONTH FROM I.TRANSICTION_DATE)) FROM DEFAULT_EXPENSE I JOIN DEFAULT_ACCOUNT D ON I.ACCOUNT_ID = D.ACCOUNT_ID AND I.USER_ID = D.USER_ID  LEFT JOIN USER_DATA U ON I.USER_ID = U.USER_ID  WHERE to_char(EXTRACT(YEAR FROM I.TRANSICTION_DATE)) = '2023' AND I.USER_ID = '"+userId+"' ORDER BY to_char(EXTRACT(MONTH FROM I.TRANSICTION_DATE))")
        })
          .then(response => response.json())
          .then(data => {
           
            setData(data)
            console.log(setData)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
  },[]);
  return (
    <div id='yearly-income'>
            <div id='income-title'>Total Expenses this year as per Month<span id='in-total'>{'₹ ' + exTotal}</span></div>
            <div className='income-container'>
                        <div className='header'>
                            <div className='table-cell'>Title</div>
                            <div className='table-cell'>Amount</div>
                            <div className='table-cell'>Account-Name</div>
                            <div className='table-cell'>Category</div>
                            <div className='table-cell'>User_name</div>
                            <div className='table-cell'>Month</div>
                        </div>
                 </div>
            <div className='record-list'>{(inData.length > 0) ? inData.map((row) => {

                return (
                   <div className='income-container'>
                    <div className='header'>
                            <div key={row[0]} className='income-row'></div>
                            <div className='income'>{row[1]}</div>
                            <div className='income'>{row[2]}</div>
                            <div className='income'>{row[3]}</div>
                            <div className='income'>{row[4]}</div>
                            <div className='income'>{row[5]}</div>
                            <div className='income'>{row[6]}</div>
                       </div>
                    </div>
                )

            }) : <div className='no-record'>Enter Income Record</div>}
            </div>
        </div>
  )
}
export default YearlyExpense