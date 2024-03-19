import React, { useEffect, useState } from "react";
import SignUp from "./Signup";
import "./Login.css";
import './SignUp.css'
import img1 from './img/img1.png'
import img2 from './img/img2.webp'
import img3 from './img/img3.png'

function Login({ setUserId, signUpBtn }) {
    // const [images] = useState(document.getElementsByClassName('slider-content'));
    // const [currentImageIndex,setIndx] = useState(0);
    // function changeImage() {
    //     images[currentImageIndex].style.display='none';
    //     images[currentImageIndex].style.opacity='0';
    //     setIndx((currentImageIndex + 1) % images.length)
    //     console.log(images[currentImageIndex])
    //     images[(currentImageIndex + 1) % images.length].style.display='block';
    //     images[(currentImageIndex + 1) % images.length].style.opacity='1';
    // }
    // const [time,setTime]=useState(setInterval(changeImage, 5000));
    // const signUp=()=>{
    //     clearInterval(time)        
    //     signUpBtn();
    // }
    const [warn, setWarn] = useState('')
    const [form, setForm] = useState({ USER_ID: '', PASSWORD: '' })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                form
            ),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setWarn('')
                    localStorage.setItem('loginData', form.USER_ID)
                    setUserId(form.USER_ID)
                } else {
                    setWarn('Invalid')
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    return (
        <div className="login-box">
            <div className="container-left">
                <div className="slider" >
                    <div className="slider-content" id="first"><img src={img1} alt="Image 1" /><h1>Manage Your Expenses Smartly</h1></div>
                    <div className="slider-content"><img src={img2} alt="Image 2" /><h1>Analayze Income/Expense</h1></div>
                    <div className="slider-content"><img src={img3} alt="Image 3" /><h1>Easy to use</h1></div>
                </div>
            </div>
            <div className="container-right" id="con">
                <div className="heading">Welcome to Personal Expense Manager</div>
                <input type="Text" placeholder="Enter your Id" id="userid" name="USER_ID" className="input" onChange={handleInput}></input>
                <input type="password" placeholder="Enter your password" id="userpassword" name="PASSWORD" className="input" onChange={handleInput}></input>
                <div>{warn}</div>
                <div className="container2">
                    <div id="password" className="text">Forget password?</div>
                    <div className="text" id="click"> Click here</div>
                </div>
                <div className="container3">
                    <button className="button" id="button1" onClick={handleSubmit}>Sign in</button>
                    <button className="button" id="button2" onClick={signUpBtn}>Sign Up</button>
                </div>
            </div>
        </div>
    );


}
export default Login;