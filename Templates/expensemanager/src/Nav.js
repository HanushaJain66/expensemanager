import React,{useState} from 'react'
import "./Nav.css"
import Mobile from './Mobile'

function Nav({ userId, setUserId, setPage }) {
    const [isMobileOpen,setMobile] = useState(false)
    const handleOpen=()=>{
        setMobile(true)
    }
    const handleClose=()=>{
        setMobile(false)
    }
    const logout = () => {
        localStorage.removeItem('loginData')
        setUserId(null)
    }
    const homePage = () => {
        setPage('home')
        handleClose()
    }
    const profilePage = () => {
        setPage('profile')
        handleClose()
    }
    const monthlyPage = () => {
        setPage('monthly')
        handleClose()
    }
    const yearlyPage = () => {
        setPage('yearly')
        handleClose()
    }
    const aboutPage = () => {
        setPage('about')
        handleClose()
    }
    if (isMobileOpen) {
        return (<Mobile homePage={homePage} profilePage={profilePage} yearlyPage={yearlyPage} aboutPage={aboutPage} monthlyPage={monthlyPage} logout={logout} isMobileOpen={isMobileOpen} setMobile={setMobile} handleClose={handleClose}/>)
    } else {
        return (
            <div id="navbar">
                <div id="left-nav">MyExpenses</div>
                <div id="right-nav">
                    <a href='#' onClick={homePage}>Home</a>
                    <a href='#' onClick={monthlyPage}>Monthly</a>
                    <a href='#' onClick={yearlyPage}>Yearly</a>
                    <a href='#' onClick={profilePage}>Profile</a>
                    <a href='#' onClick={aboutPage}>About us</a>
                    <a onClick={logout}>Log Out</a>
                </div>
                <div id="right-nav-mobile">
                    <a href='#' onClick={handleOpen}>=</a>
                </div>
            </div>
        )
    }

}

export default Nav;