import React, { useState,useEffect } from 'react'
import './Income.css'
import './Record.css'
import './Daily.css'

function Income({counter,inTotal,userId,result}) {
    const [inData,setData] = useState([[]])
    const [icon,setImg] = useState()
    useEffect(() => {
          fetch('/api',{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify("SELECT I.TRANSICTION_ID,I.TITLE,I.AMOUNT,D.ACCOUNT_NAME,I.DESCRIPTION,I.CATEGORY,U.USER_NAME FROM DEFAULT_INCOME I JOIN DEFAULT_ACCOUNT D ON I.ACCOUNT_ID=D.ACCOUNT_ID AND I.USER_ID=D.USER_ID LEFT JOIN USER_DATA U ON I.RECEIVED_FROM=U.USER_ID WHERE to_char(I.TRANSICTION_DATE) = to_char(SYSDATE+"+counter+") AND I.USER_ID='"+userId+"' ORDER BY I.TRANSICTION_DATE"),
          })
            .then(response => response.json())
            .then(data => {
              setData(data)
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
    },[counter,result]);
        
    return (
        <div id='income-box'>
            <div id='income-title'>Total Income<span id='in-total'>{'₹ '+inTotal}</span></div>
            <div className='record-list'>{(inData.length>0)?inData.map((row)=>{
                return (
                    <div key={row[0]} className='record'>
                        <div className='record-left'>
                            <span className='record-first-line'>
                                <img src={require(`./img/${(row[5]!=undefined)?row[5]:'IC0'}.png`)} className='record-img'/>
                                <span className='record-title'>{row[1]}</span>
                                <span className='record-ac'>{row[3]}</span>
                            </span>
                                <div className='record-desc'>{row[4]}</div>
                        </div>
                        <div>
                            <div className='record-amount'>{'₹ '+row[2]}</div>
                            <div className='record-from'>{(row[6]!=null)?'from '+row[6]:''}</div>
                        </div>
                        
                    </div>
                )
                }):<div className='no-record'>Enter Income Record</div>}
            </div>
        </div>
    )
}
export default Income;