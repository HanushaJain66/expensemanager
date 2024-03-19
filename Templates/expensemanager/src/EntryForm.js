import React, { useId, useState } from 'react'
import './EntryForm.css'
import IncomeForm from './IncomeForm'
import ExpenseForm from './ExpenseForm'

function EntryForm({ userId,counter,result,setResult }) {
    const [inBtn, setInBtn] = useState(true)
    const [exBtn, setExBtn] = useState(false)
    const handleClick = (e) => {
        setInBtn(inBtn === true ? false : true)
        setExBtn(exBtn === true ? false : true)
    }

    return (
        <div id='entry-form-box'>
            <div id='menu-box'>
                <button className='menu-btn' id='income-btn' style={{ backgroundColor: (inBtn) ? '#1186934c' : '#464646' }} onClick={handleClick}>Income</button>
                <button className='menu-btn' id='expense-btn' style={{ backgroundColor: (exBtn) ? '#1186934c' : '#464646' }} onClick={handleClick}>Expense</button>
            </div>
            {(inBtn)?<IncomeForm userId={ userId } counter={counter} result={result} setResult={setResult}/>:<ExpenseForm userId={userId} counter={counter} result={result} setResult={setResult}/>}
        </div>
    )
}
export default EntryForm;