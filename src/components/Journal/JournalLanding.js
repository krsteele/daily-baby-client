import React, { useEffect, useState, useContext } from "react"
import { Route } from "react-router-dom"
import { useHistory } from "react-router-dom"


import { ProfileContext } from "../profile/ProfileDataProvider"
import { AddChildButton } from "../baby/AddChildButton"


// react-bootstrap components
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const JournalLanding = (props) => {
    const history = useHistory()

    const { getProfile } = useContext(ProfileContext)
    const [profile, setProfile] = useState({dailyuser:{user:{}}, userbabies: []})


    useEffect(() => {
        getProfile()
            .then((returnedProfile) => {
                setProfile(returnedProfile)
            })
    }, [])
    
    return(
        <Container>
            
                <h1>Journals</h1>
                
                <div className="journal__children">
                <h3></h3>
                <Route render={props => <AddChildButton {...props} />} />
                {
                    profile.userbabies.length < 0 
                    ?
                    <Alert variant="warning">Please 
                            <Alert.Link href="/children/create">add a child</Alert.Link> to begin your journal.</Alert>
                    :
                    profile.userbabies.map(baby => {
                        return (
                            <Card border="primary" className="text-center" style={{ width: '18rem' }} key={baby.baby.id} onClick={() => history.push(`/journal/${baby.baby.id}`)}>
                                <Card.Header>View the journal for</Card.Header>
                                <Card.Header>{baby.baby.first_name} {baby.baby.middle_name} {baby.baby.last_name}</Card.Header>
                                <Card.Body>
                                    <Image src={baby.baby.profile_image} roundedCircle />
                                </Card.Body>
                                <Card.Body>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>
                
        </Container>
    )
}