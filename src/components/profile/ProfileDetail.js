import React, { useEffect, useState, useContext } from "react"

import { ProfileContext } from "./ProfileDataProvider"

// react-bootstrap components
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'


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
        <Container>
            <div className="profile__personal">
                <h1>Profile</h1>
                <h3>Personal Information</h3>
                <p><b>Name:</b> {profile.dailyuser.user.first_name} {profile.dailyuser.user.last_name}</p>
                <p><b>Username:</b> {profile.dailyuser.user.username}</p>
                <p><b>Email:</b> {profile.dailyuser.user.email}</p>
            </div>
            <div className="profile__preferences">
                <h3>Preferences</h3>
                <p className="lead">When and where would you like to receive journal text message reminders?</p>
                <p><b>Phone number:</b> {profile.dailyuser.phone_number}</p>
                <p><b>Reminder frequency: </b></p>
                    <ul>
                        {profile.dailyuser_days.map(day => <li>{day.day.day}</li>)}
                    </ul>
                <p><b>Reminder time:</b> {profile.dailyuser.text_time === null ? "Please set your reminder time." : `${profile.dailyuser.text_time}`}</p>
            </div>
            <div className="profile__children">
                <h3>Children</h3>
                {
                    profile.userbabies > 0 
                    ?
                    <p>Please add a child to begin your journal.</p>
                    :
                    <ListGroup>
                    {
                        profile.userbabies.map(baby => {
                            return (
                                <ListGroup.Item action href={`babies/${baby.baby.id}`} key={baby.baby.id}>{baby.baby.first_name} {baby.baby.middle_name} {baby.baby.last_name}</ListGroup.Item>
                            )
                    })
                }
                </ListGroup>
                }
            </div>
                
        </Container>
    )
}