import React, { useContext, useEffect, useState } from "react"
import { JournalContext } from "./JournalDataProvider"
import { BabyContext } from "../baby/BabyDataProvider"
import { useHistory } from "react-router-dom"
import { Route } from "react-router-dom"
// components
import { AddEntryButton } from "./AddEntryButton"
// react bootstrap
import Card from 'react-bootstrap/Card'
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
// font awesome
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const JournalList = (props) => {
    const history = useHistory()

    const { getJournal, entries, deleteEntry } = useContext(JournalContext)
    const { getBaby } = useContext(BabyContext)
    const [baby, setBaby] = useState({baby: {}, relationship: {}})

    useEffect(() => {
        const baby = parseInt(props.match.params.babyId)
        getBaby(baby).then(setBaby)
        getJournal(baby)
    }, [])
    console.log(baby)
    return(
        <Container>
            <h1>Journal for {baby.baby.first_name}</h1>
            <Route render={props => <AddEntryButton {...props} />} />

            <Row xs={1} sm={2} md={3} lg={4} xl={5}>

                {
                    entries.map(entry => {
                        return  <Col key={entry.id+"entry"}>
                                    <Card >
                                        {
                                            entry.photo === null ? (
                                                ""
                                            ):(

                                                <Card.Img variant="top" src={entry.photo.image} />
                                            )
                                        }
                                        <Card.Body>{entry.text}
                                            {
                                                entry.by_current_user ? (
                                                    <ListGroup className="list-group-flush">
                                                        <Row className="text-center">
                                                            <Col>
                                                                <FontAwesomeIcon icon={faEdit} onClick={() => history.push(`/journal/edit/${entry.id}`)} />
                                                            </Col>
                                                            <Col>
                                                                <FontAwesomeIcon icon={faTrash} onClick={() => deleteEntry(entry.id).then(()=> getJournal(baby.baby.id).then(() => history.push(`/journal/${baby.baby.id}`)))} />
                                                            </Col>
                                                        </Row>
                                                    </ListGroup>
                                                ):(
                                                    ""
                                                )
                                            }
                                        </Card.Body>
                                        <Card.Footer className="text-muted">{entry.user_baby.user.user.username} on {entry.created_on}</Card.Footer>
                                    </Card>
                                </Col>
                        
                    })
                }
            </Row>
            
        </Container>
    )
}