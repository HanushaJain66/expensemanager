import React, { useEffect, useState } from 'react'
import BalanceBar from './BalanceBar';
import AddAc from './AddAc';
import './Profile.css'
import sub from './img/submit.png'

function Profile({ userId }) {
    const [result, setResult] = useState('')
    const [result2, setResult2] = useState('')
    const [deAc, setDeAc] = useState('')
    const [acData, setAc] = useState([[], []])
    const [formData, setFormData] = useState({
        user_id: String(userId),
        name: '',
        description: '',
        type: '',
        opening: '',
        balance: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        if (formData.name == '' || formData.opening == '') {
            setResult('Enter proper data')
        } else {
            formData.balance = formData.opening;
            fetch('/account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    setResult(data)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
        formData.name = ''
        formData.description = ''
        formData.type = ''
        formData.opening = ''
        formData.balance = ''
        setTimeout(() => {
            setResult('')
        }, 10000)
    }
    useEffect(()=>{
        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify("SELECT ACCOUNT_NAME,ACCOUNT_ID FROM DEFAULT_ACCOUNT WHERE USER_ID='" + userId + "'"),
        })
            .then(response => response.json())
            .then(data => {
                setAc(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const acChange=(e)=>{
        setDeAc(e.target.value)
    }
    const setDefaultAc=()=>{
        fetch('/setAc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify("UPDATE USER_DATA SET DEFAULT_ACCOUNT_ID='"+deAc+"' WHERE USER_ID='" + userId + "'"),
        })
            .then(response => response.json())
            .then(data => {
                setResult2(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    return (
        <>
            <div id='add-ac-box'>
                <div id='add-ac-title'>Add Account</div>
                <div id='add-ac-form'>
                    <>
                        <div className='record-form'>
                            <input required type='text' name='name' onChange={handleInputChange} className='form-field' placeholder='Account Name' value={formData.name}></input>
                            <input required type='text' name='description' onChange={handleInputChange} className='form-field' placeholder='Description' value={formData.description}></input>
                            <input required type='text' name='type' onChange={handleInputChange} className='form-field' placeholder='Account Type' value={formData.type}></input>
                            <input type='text' name='opening' onChange={handleInputChange} className='form-field' placeholder='Opening Balance' value={formData.opening}></input>
                            <button className='record-btn' placeholder='Recieved From' value='Submit' onClick={handleSubmit} ><img width='40px' src={sub} /></button>
                        </div>
                        <div className='remark' style={{ color: (result == 'Enter proper data') ? 'red' : '#6cc9ff' }}>{result}</div>
                    </>
                </div>
            </div>
            <div id='add-ac-box'>
                <div id='add-ac-title'>Set Default Account</div>
                <div id='add-ac-form'>
                    <>
                        <div className='record-form'>
                            <select required name='account' onChange={acChange} className='form-field' value={formData.account}>
                                <option className='option' value="">Select an Account</option>
                                {acData.map((row) => {
                                    return (<option key={row[1]} value={row[1]} className='option'>{row[0]}</option>)
                                })}
                            </select>
                            <button className='record-btn' placeholder='Recieved From' value='Submit' onClick={setDefaultAc} ><img width='40px' src={sub} /></button>
                        </div>
                        <div className='remark' style={{ color:'#6cc9ff' }}>{result2}</div>
                    </>
                </div>
            </div>
            <BalanceBar userId={userId} />
            <AddAc userId={userId} />
        </>
    )
}
export default Profile;