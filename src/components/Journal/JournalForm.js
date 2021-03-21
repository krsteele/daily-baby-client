import React, { useContext, useEffect, useState } from "react"

import { JournalContext } from "./JournalDataProvider"
import { BabyContext } from "../baby/BabyDataProvider"

// React-Hook-Form
import { useForm } from "react-hook-form"

// React-Bootstrap Component imports
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"

export const JournalForm = (props) => {
    const { getEntry, addJournalEntry, updateJournalEntry } = useContext(JournalContext)
    const { getBabies, babies } = useContext(BabyContext)
    
    const [entry, setEntry] = useState({photo: {}, user_baby: {baby: {}, user: {user: {}}}})


    //  Grab needed functions from React-Form-Hook
    const { register, handleSubmit, errors, formState } = useForm()

    // Get data needed to render dropdown
    useEffect(() => {
        getBabies()
    }, [])
    // Check for edit mode
    // If edit mode, get and set entry to be updated

    // Build function to create or update entry
    const entryAddOrUpdate = (data) => {
        console.log("Someone clicked my button!", data)
    }

    console.log(babies)
    return (
        <Container>
            <h2>New Journal Entry</h2>
            <Form onSubmit={handleSubmit(entryAddOrUpdate)}>
                <Form.Group controlId="form__baby">
                    <Form.Label>Child</Form.Label>
                    <Form.Control ref={register({valueAsNumber: true})} name="babyId" as="select">
                    <option value="null">Who is your entry about?</option>
                    {
                        babies.map(baby => (
                            <option key={baby.baby.id} value={baby.baby.id}>{baby.baby.first_name} {baby.baby.middle_name} {baby.baby.last_name}</option>
                        ))
                    }
                    </Form.Control>
                </Form.Group>
                <Button className="btn" variant="primary" type="submit" disabled={formState.isSubmitting}>Submit</Button>
            </Form>

        </Container>
    )


}