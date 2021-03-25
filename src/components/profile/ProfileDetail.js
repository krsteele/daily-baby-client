import React, { useEffect, useState, useContext } from "react"
import { Route } from "react-router-dom"
import { useHistory } from "react-router-dom"


import { ProfileContext } from "./ProfileDataProvider"
import { AddChildButton } from "../baby/AddChildButton"


// react-bootstrap components
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ProfileDetail = (props) => {
    const history = useHistory()

    const { getProfile } = useContext(ProfileContext)
    const [profile, setProfile] = useState({dailyuser:{user:{}}, userbabies: []})
    const [selectedDays, setSelectedDays] = useState([])


    useEffect(() => {
        getProfile()
            .then((returnedProfile) => {
                setProfile(returnedProfile)
            })
    }, [])

    useEffect(() => {
        let days = []

        if (profile.dailyuser.monday === true){
            days.push("Monday")
        }
        if (profile.dailyuser.tuesday === true){
            days.push("Tuesday")
        }
        if (profile.dailyuser.wednesday === true){
            days.push("Wednesday")
        }
        if (profile.dailyuser.thursday === true){
            days.push("Thursday")
        }
        if (profile.dailyuser.friday === true){
            days.push("Friday")
        }
        if (profile.dailyuser.saturday === true){
            days.push("Saturday")
        }
        if (profile.dailyuser.sunday === true){
            days.push("Sunday")
        }

        setSelectedDays(days)
    }, [profile])
    
    return(
        <Container>
            <div className="profile__personal">
                <Image src={profile.dailyuser.profile_image} />
                <h1>Profile</h1>
                <Button className="btn" variant="primary" type="button" onClick={() => history.push("/profile/edit")} >Edit Profile & Preferences</Button>
                <h3>Personal Information</h3>
                <p><b>Name:</b> {profile.dailyuser.user.first_name} {profile.dailyuser.user.last_name}</p>
                <p><b>Username:</b> {profile.dailyuser.user.username}</p>
                <p><b>Email:</b> {profile.dailyuser.user.email}</p>
            </div>
            <div className="profile__preferences">
                <h3>Preferences</h3>
                <p><b>You'll receive text message reminders</b></p>
                <p><b>At this number:</b> {profile.dailyuser.phone_number}</p>
                <p><b>At this time:</b> {profile.dailyuser.text_time}</p>
                <p><b>On these days: </b></p>
                    {
                        selectedDays.map(day => {
                            return <p>{day}</p>
                        })
                    }
            </div>
            <div className="profile__children">
                <h3>Children</h3>
                <Route render={props => <AddChildButton {...props} />} />
                {
                    profile.userbabies > 0 
                    ?
                    <Alert variant="warning">Please add a child to begin your journal.</Alert>
                    :
                    profile.userbabies.map(baby => {
                        return (
                            <Card border="primary" style={{ width: '18rem' }} key={baby.baby.id}>
                                <Card.Header>{baby.baby.first_name} {baby.baby.middle_name} {baby.baby.last_name}</Card.Header>
                                <Card.Body>
                                <Card.Text>
                                    Born {baby.baby.birth_date}
                                </Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <FontAwesomeIcon icon={faBookOpen} onClick={() => props.history.push(`/journal/${baby.baby.id}`)} />
                                    <FontAwesomeIcon icon={faEdit} onClick={() => props.history.push(`/children/edit/${baby.baby.id}`)} />
                                    <FontAwesomeIcon icon={faPlusCircle} onClick={() => props.history.push("/journal/create")} />
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>
                
        </Container>
    )
}