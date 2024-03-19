import React, { useEffect, useState } from 'react'
import "./BalanceBar.css"

function BalanceBar({ userId }) {
    const [accountList, setAc] = useState([])
    const [total, setTotal] = useState(0)
    useEffect(() => {
        fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                "SELECT ACCOUNT_NAME,BALANCE FROM DEFAULT_ACCOUNT WHERE USER_ID='" + userId + "'"
            ),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data[0][0] != null) {
                    setAc(data);
                } else {
                    setAc([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                "SELECT SUM(BALANCE) FROM DEFAULT_ACCOUNT WHERE USER_ID='" + userId + "'"
            ),
        })
            .then((response) => response.json())
            .then((data) => {
                setTotal(data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [])
    return (
        <div id="balance-box">
            <div id='balance-title'>Balance</div>
            <div id='accout-balance'>
                {accountList.map((row) => {
                    return (
                        <div className='account-row'>
                            <span className='account-name'>{row[0]}</span>
                            <span className='account-balance' style={{color:(row[1]>0)?'rgb(3, 255, 3)':'rgb(255, 47, 0)'}}>{'₹ '+row[1]}</span>
                        </div>
                    )
                })}
                <div className='account-row' id='total'>
                    <span className='account-name'>Total Balance</span>
                    <span className='account-balance' style={{color:(total>0)?'rgb(3, 255, 3)':'rgb(255, 47, 0)'}}>{'₹ '+total}</span>
                </div>
            </div>
        </div>
    )
}
export default BalanceBar;