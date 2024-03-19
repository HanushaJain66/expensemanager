import React, { useState } from 'react'
import './Mobile.css'

function Mobile({homePage, profilePage, logout, yearlyPage,aboutPage, monthlyPage,isMobileOpen,setMobile,handleClose }) {
    
  return (
    <div id='mobile-box'>
        <div id='mobile-close-btn'><a onClick={handleClose}>x</a></div>
        <div id='mobile-title'>SmartExpenseManager</div>
        <div id='mobile-menu-box'>
            <a href='#' onClick={homePage}>Home</a>
            <a href='#' onClick={monthlyPage}>Monthly</a>
            <a href='#' onClick={yearlyPage}>Yearly</a>
            <a href='#' onClick={profilePage}>Profile</a>
            <a href='#' onClick={aboutPage}>About us</a>
            <a onClick={logout}>Log Out</a>
        </div>
    </div>
  )
}
export default Mobile;