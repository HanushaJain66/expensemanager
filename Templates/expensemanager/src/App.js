import React, { useId, useState } from 'react'
import Nav from './Nav';
import Daily from './Daily';
import Login from './Login';
import SignUp from './Signup';
import Monthly from './Monthlyfinal';
import Profile from './Profile';
import About from './About';
import Yearly from './Yearly';


// Bascially esme routing ke liye state ko set kara and then usse set kara page ko depending on
function App() {
    const [userId, setUserId] = useState(localStorage.getItem('loginData'));
    const [signUp, setSignUp] = useState(false)
    const [page, setPage] = useState('home')

    const signUpBtn = () => {
        setSignUp(!signUp)
    }

    if (userId == null) {
        if (!signUp) {
            return <Login setUserId={setUserId} signUpBtn={signUpBtn}/>
        } else {
            return <SignUp setUserId={setUserId} signUpBtn={signUpBtn} />
        }
    } else {
        if (page === 'home') {
            return (
                <>
                    <Nav userId={userId} setUserId={setUserId} setPage={setPage}/>
                    <Daily userId={userId} />
                </>
            )
        } else if(page==='profile'){
            return (
                <>
                    <Nav userId={userId} setUserId={setUserId} setPage={setPage}/>
                    <Profile userId={userId} />
                </>
            )
        } else if(page==='monthly'){
            return (
                <>
                    <Nav userId={userId} setUserId={setUserId} setPage={setPage}/>
                    <Monthly userId={userId} />
                </>
            )
        } else if(page==='yearly'){
            return (
                <>
                    <Nav userId={userId} setUserId={setUserId} setPage={setPage}/>
                    <Yearly userId={userId} />
                </>
            )
        } else if(page==='about'){
            return (
                <>
                    <Nav userId={userId} setUserId={setUserId} setPage={setPage}/>
                    <About userId={userId} />
                </>
            )
        }
        
    }
}

export default App;