import React,{useEffect,useState} from 'react'
import './AddAc.css'

function AddAc({userId}) {
    const [userData,setUserData] = useState([[]])
    useEffect(() => {
        fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                "SELECT USER_ID, USER_NAME, EMAIL, MOBILE_NO, PROFESSION, DEFAULT_ACCOUNT_ID, DATE_OF_REGISTER FROM USER_DATA WHERE USER_ID='" + userId + "'"
            ),
        })
            .then((response) => response.json())
            .then((data) => {
                setUserData(data)
                console.log(data,userData)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [])
    return (
        <>
            <div id='profile-box'>
                <div id='profile-title'>User Profile</div>
                <div id='user-data'>
                    <div className='profile-row'><label for='id'>User ID:</label><input type='text' id='id' value={userData[0][0]}></input></div>
                    <div className='profile-row'><label for='name'>User Name:</label><input type='text' id='name' value={userData[0][1]}></input></div>
                    <div className='profile-row'><label for='email'>Email:</label><input type='text' id='email' value={userData[0][2]}></input></div>
                    <div className='profile-row'><label for='mobile'>Mobile:</label><input type='text' id='mobile' value={userData[0][3]}></input></div>
                    <div className='profile-row'><label for='ac'>Default Account:</label><input type='text' id='ac' value={userData[0][5]}></input></div>
                    <div className='profile-row'><label for='proff'>Proffession:</label><input type='text' id='proff' value={userData[0][4]}></input></div>
                    <div className='profile-row'><label for='doj'>Date of Joining:</label><input type='text' id='doj' value={userData[0][6]}></input></div>
                </div>
            </div>
        </>
    )
}
export default AddAc;