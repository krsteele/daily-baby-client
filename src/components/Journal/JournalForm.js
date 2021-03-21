import React, { useContext, useEffect, useState } from "react"

import { JournalContext } from "./JournalDataProvider"

// React-Hook-Form
import { useForm } from "react-hook-form"

// React-Bootstrap Component imports
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"

export const JournalForm = (props) => {
    const { getEntry, addJournalEntry, updateJournalEntry } = useContext(JournalContext)
    const [entry, setEntry] = useState({photo: {}, user_baby: {baby: {}, user: {user: {}}}})

    //  Grab needed functions from React-Form-Hook
    const { register, handleSubmit, errors, formState } = useForm()

    // Get data needed to render dropdown
    // - need children by user

    // Check for edit mode
    // If edit mode, get and set entry to be updated

    // Build function to create or update entry

    return (
        <Container>
            <div>Hey, I'm the journal entry form!</div>
        </Container>
    )


}