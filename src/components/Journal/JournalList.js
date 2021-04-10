import React, { useContext, useEffect, useState } from "react"
import { JournalContext } from "./JournalDataProvider"
import { BabyContext } from "../baby/BabyDataProvider"
import { useHistory } from "react-router-dom"
import { Route } from "react-router-dom"
// components
import { AddEntryButton } from "./AddEntryButton"
// react bootstrap
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Row from 'react-bootstrap/Row'
import Tooltip from 'react-bootstrap/Tooltip'
// CSS
import "./journal.css"
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
    return(
        <main>
            <section className="journal">
            <h1>Journal for {baby.baby.first_name}</h1>
            <Route render={props => <AddEntryButton {...props} />} />

            <div className="journal--container">
                {
                    entries.map(entry => {
                        return  <div className="col" key={entry.id+"entry"}>
                                    <Card >
                                        {
                                            entry.photo === null ? (
                                                ""
                                            ):(
                                                <Card.Img variant="top" src={entry.photo.image} />
                                            )
                                        }
                                        <Card.Body>{entry.text}</Card.Body>
                                            {
                                                entry.by_current_user ? (
                                                    <Card.Body className="list-group-flush">
                                                        <Row className="text-center">
                                                            <Col>
                                                                <OverlayTrigger
                                                                    key="edit"
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip>
                                                                            Edit journal entry.
                                                                        </Tooltip>
                                                                    }
                                                                    >
                                                                    <FontAwesomeIcon icon={faEdit} onClick={() => history.push(`/journal/edit/${entry.id}`)} />
                                                                </OverlayTrigger>
                                                            </Col>
                                                            <Col>
                                                                <OverlayTrigger
                                                                    key="delete"
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip>
                                                                            Delete journal entry.
                                                                        </Tooltip>
                                                                    }
                                                                    >
                                                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteEntry(entry.id).then(()=> getJournal(baby.baby.id).then(() => history.push(`/journal/${baby.baby.id}`)))} />
                                                                </OverlayTrigger>    
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                ):(
                                                    ""
                                                )
                                            }
                                        
                                        <Card.Footer className="text-muted">by {entry.user_baby.user.user.username} on {entry.created_on}</Card.Footer>
                                    </Card>
                                </div>
                        
                    })
                }
                </div>
            </section>
        </main>
    )
}