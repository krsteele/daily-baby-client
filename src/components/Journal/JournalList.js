import React, { useContext, useEffect } from "react"
import { JournalContext } from "./JournalDataProvider"

import Card from 'react-bootstrap/Card'
import { Container } from "react-bootstrap"

export const JournalList = (props) => {
    const { getJournal, entries } = useContext(JournalContext)

    useEffect(() => {
        const baby = parseInt(props.match.params.babyId)

        getJournal(baby)
    }, [])
    console.log(entries)
    return(
        <Container fluid>
            <ul>

                {
                    entries.map(entry => {
                        return <li>{entry.id}</li>
                        
                    })
                }
            </ul>
            
        </Container>
    )
}