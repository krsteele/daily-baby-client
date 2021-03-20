import React, { useEffect, useState, useContext } from "react"

import { ProfileContext } from "./ProfileDataProvider"

// react-bootstrap components


export const ProfileDetail = (props) => {

    const { getProfile } = useContext(ProfileContext)
    const [profile, setProfile] = useState({dailyuser:{user:{}}, dailyuser_days: [], userbabies: []})


    useEffect(() => {
        getProfile()
            .then((returnedProfile) => {
                setProfile(returnedProfile)
            })
    }, [])

    
    console.log("gotten profile", profile)

    return(
        <>
            <h1>Profile</h1>
            <h3>Personal Information</h3>
            <p><b>Name:</b> {profile.dailyuser.user.first_name} {profile.dailyuser.user.last_name}</p>
            <p><b>Username:</b> {profile.dailyuser.user.username}</p>
            <p><b>Email:</b> {profile.dailyuser.user.email}</p>

            <h3>Preferences</h3>
            <p className="lead">When and where would you like to receive journal text message reminders?</p>
            <p><b>Phone number:</b> {profile.dailyuser.phone_number}</p>
            <p><b>Reminder frequency: </b></p>
                <ul>
                    {profile.dailyuser_days.map(day => <li>{day.day.day}</li>)}
                </ul>
                
        </>
    )
}