import React, { useContext, useEffect, useState } from "react"

import { JournalContext } from "./JournalDataProvider"
import { BabyContext } from "../baby/BabyDataProvider"

// React-Hook-Form
import { useForm } from "react-hook-form"

// React-Bootstrap Component imports
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { render } from "@testing-library/react"

export const JournalForm = (props) => {
    const { getEntry, addJournalEntry, updateJournalEntry } = useContext(JournalContext)
    const { getBabies, babies } = useContext(BabyContext)
    
    const [entry, setEntry] = useState({photo: {}, user_baby: {baby: {}, user: {user: {}}}})
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)


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

    const uploadImage = async (e) => {
        const files = e.target.files; //get the files that have been selected by the user
        const data = new FormData(); //
        data.append("file", files[0]); //get file that has been uploaded
        data.append("upload_preset", "db_entry"); // get the preset
        setLoading(true); //changing value from false to true
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/fluffydaydream/image/upload",
        
            {
                method: "POST",
                body: data,
            }
        );
        const file = await res.json();
        console.log(file.secure_url);
    
        setImage(file.secure_url);
        setLoading(false);
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
                <Form.Group>
                    <Form.File ref={register} name="entryImage" id="entryImage" label="Upload an image" onChange={uploadImage} />
                    {loading ? (
                        <h3>Loading...</h3>
                    ) : (
                        <img src={image} style={{ width: "300px" }} />
                    )}
                </Form.Group>
                <Form.Group controlId="form__entry">
                    <Form.Label>What wonderful things are happening in your baby's life right now?</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button className="btn" variant="primary" type="submit" disabled={formState.isSubmitting}>Submit</Button>
            </Form>

        </Container>
    )


}