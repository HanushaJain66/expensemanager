import React, { useState, useEffect } from 'react'
import './SignUp.css'
import Login from './Login';

const SignUp = ({ setUserId, signUpBtn }) => {
    const [isOTPSent, setOTPSent] = useState(0)
    const [OTP, setOTP] = useState('')
    const [OTP2, setOTP2] = useState('')
    const [formData, setFormData] = useState({
        ID: '',
        Name: '',
        Email: '',
        Phone: '',
        Pswd1: '',
        Pswd2: '',
        Proff: ''
    })
    const [warn, setWarn] = useState('')
    const LogIn = () => {
        signUpBtn();
    }
    const sendOTP=()=>{
        setOTPSent(1)
        setWarn('OTP is being sent...')
        fetch("/otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData.Email),
        })
            .then((response) => response.json())
            .then((data) => {
                setOTPSent(2)
                setWarn('OTP has been sent to your Email Id.')
                setOTP2(data)
                console.log(data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }
    const handleOTP = () => {
        if (formData.ID === '' || formData.Name === '' || formData.Email === '' || formData.Phone === '' || formData.Pswd1 === '' || formData.Pswd2 === '') {
            setOTPSent(-1)
            setWarn('Enter Proper Data!')
        } else if (formData.Pswd1 != formData.Pswd2) {
            setOTPSent(-1)
            setWarn('Passwords do not match!')
        }else {
            fetch("/userId", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData.ID),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('data',data)
                    if (data == 0) {
                        setOTPSent(-1)
                        setWarn('User ID is not available!')
                    } else {
                        setOTPSent(0)
                        setWarn('')
                        sendOTP()
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const handleOTPIn = (e) => {
        setOTP(e.target.value)
    }
    const handleSubmit = () => {
        console.log(OTP, OTP2)
        if (OTP != OTP2) {
            setOTPSent(-1)
            setWarn('OTP does not match!')
        } else {
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    formData
                ),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    if (data == 0) {
                        setUserId(formData.ID)
                        localStorage.setItem('loginData', formData.ID)
                        warn = ''
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }

    }
    return (
        <div className='sign-up-box'>
            <div className="container">
                <div className="title">Registration</div>
                <div className="content">
                    <div className="user-details">
                        <div className="input-box">
                            <input type="text" placeholder="Enter your name" required name="ID" id="User_Id" onChange={handleInput} />
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder="Enter your username" required name="Name" id="User_Name" onChange={handleInput} />
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder="Enter your email" required name="Email" id="Email" onChange={handleInput} />
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder="Enter your number" required name="Phone" id="Phone_Number" onChange={handleInput} />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Enter your password" required name="Pswd1" id="Password" onChange={handleInput} />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Confirm your password" required name="Pswd2" id="Confirm_Password" onChange={handleInput} />
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder="Enter your Profession" required name="Proff" id="Profession" onChange={handleInput} />
                        </div>
                        <div className="input-box" style={{ display: (isOTPSent === 2) ? 'block' : 'none' }}>
                            <input type="text" placeholder="Enter 6 Digit OTP" required name="OTP" id="OTP" onChange={handleOTPIn} />
                        </div>
                    </div>
                    <input id='otp-btn' className="button" type="submit" value="Get OTP" onClick={handleOTP} style={{ display: (isOTPSent === 2 ) ? 'none' : 'inline' }} />
                    <input className="button" type="submit" value="Register" onClick={handleSubmit} style={{ display: (isOTPSent === 2) ? 'inline' : 'none' }} />
                    <input className="button" type="submit" value="Login" onClick={LogIn} />
                    <div id='warn' style={{ color: (isOTPSent === 1 || isOTPSent === 2) ? 'gray' : 'red' }}>{warn}</div>
                </div>
            </div></div>

    )
}

export default SignUp;