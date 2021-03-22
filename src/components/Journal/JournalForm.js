import React, { useContext, useEffect, useState } from "react"

import { JournalContext } from "./JournalDataProvider"
import { BabyContext } from "../baby/BabyDataProvider"

// React-Hook-Form
import { useForm } from "react-hook-form"

// React-Bootstrap Component imports
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Image from 'react-bootstrap/Image'

export const JournalForm = (props) => {
    const { getEntry, addJournalEntry, updateJournalEntry, deleteEntry } = useContext(JournalContext)
    const { getBabies, babies } = useContext(BabyContext)
    
    const [entry, setEntry] = useState({photo: {}, user_baby: {baby: {}, user: {user: {}}}})
    const [image, setImage] = useState("")
    const [editModeImage, setEditModeImage] = useState("")
    const [fileInputLabel, setFileInputLabel] = useState("Upload an image")


    //  Grab needed functions from React-Form-Hook
    const { register, handleSubmit, errors, formState, reset } = useForm()

    // Get data needed to render dropdown
    useEffect(() => {
        getBabies()
        getEntryInEditMode()
    }, [])
    // Check for edit mode
    // If edit mode, get and set entry to be updated
    const editMode = props.match.params.hasOwnProperty("entryId")
    const entryId = props.match.params.entryId

    const getEntryInEditMode = () => {
        if (editMode) {
            getEntry(entryId).then(setEntry).then(() => {
                const entryImage = entry.photo.image
                setEditModeImage(entryImage)
                setFileInputLabel("Change Image")
            })
        } 
    };

    // Called on form submit to create or edit the entry
    const entryAddOrUpdate = (data) => {
        if (editMode) {
            data.image = editModeImage
            data.id = entryId
            data.created_on = entry.created_on
            data.is_private = entry.is_private
            data.prompt = entry.prompt
            data.userBaby = entry.user_baby.id
            console.log("update data", data)
            updateJournalEntry(data)
                .then(() => props.history.push(`/journal/${entry.user_baby.baby.id}`))
        } else {
            addJournalEntry({
                text: data.text,
                babyId: data.babyId,
                image: image,
                is_private: false,
                prompt: 1
            })
            .then(() => props.history.push(`/journal/${data.babyId}`))
        }
    }

    const imageUpload = (url, data) => {
        return fetch(url, {
            method: 'POST',
            body: data
        })
        .then(res => res.json())
    }

    const uploadImage = (e) => {
        const files = e.target.files; //get the files that have been selected by the user
        const data = new FormData(); //
        data.append("file", files[0]); //get file that has been uploaded
        data.append("upload_preset", "db_entry"); // get the preset
        const url = "https://api.cloudinary.com/v1_1/fluffydaydream/image/upload"
        setFileInputLabel("Loading..."); 
        imageUpload(url, data).then(file => {
            console.log(file)
            if(editMode){
                setEditModeImage(file.secure_url)
                console.log("editMode image", file.secure_url)
            }
            else {
                setImage(file.secure_url)
                console.log("image", file.secure_url)
            }
        }).then(() => {
            setFileInputLabel("Change Image"); 
        })
    }

    return (
                <Container>
                    {
                        editMode ? (
                            <h2>Edit Journal Entry</h2>
                        ):(

                            <h2>New Journal Entry</h2>
                        )
                    }

                    <Form onSubmit={handleSubmit(entryAddOrUpdate)}>

                        <Form.Group controlId="form__baby">
                            <Form.Label>Child</Form.Label>
                                {editMode && entry.by_current_user ?(
                                <p>{entry.user_baby.baby.first_name} {entry.user_baby.baby.middle_name} {entry.user_baby.baby.last_name}</p>
                                ) : (
                                <Form.Control ref={register({valueAsNumber: true})} name="babyId" as="select">
                                <option key="0">Who is your entry about?</option>
                                
                                    {babies.map(baby => {
                                        return <option key={baby.baby.id} value={baby.baby.id}>{baby.baby.first_name} {baby.baby.middle_name} {baby.baby.last_name}</option>
                                    })}
                                </Form.Control>
                                )}
                        </Form.Group>

                        <Form.Group>
                            <Form.File ref={register} name="entryImage" key="entryImage" id="entryImage" label={fileInputLabel} onChange={uploadImage}  />
                                {
                                    editMode && entry.by_current_user ? (
                                        <Image src={editModeImage} fluid />
                                    ) : (
                                        <Image src={image} fluid />
                                    )
                                }
                        </Form.Group>
                        <Form.Group controlId="form__entry">
                            <Form.Label>What wonderful things are happening in your baby's life right now?</Form.Label>
                            <Form.Control as="textarea" rows={3} key="entryText" name="text" ref={register} defaultValue={entry.text} />
                        </Form.Group>
                            {
                                editMode && entry.by_current_user ? (
                                    <Form.Group>
                                    <Button className="btn" variant="primary" type="submit" disabled={formState.isSubmitting}>Update</Button>
                                    <Button className="btn" variant="outline-primary" type="button" onClick={() => props.history.push(`/journal/${entry.user_baby.id}`)} >Cancel</Button>
                                    <Button className="btn" variant="outline-primary" onClick={() => deleteEntry(entryId).then(()=> props.history.push("/journal"))}>Delete</Button>
                                    </Form.Group>
                                ):(
                                    <Form.Group>
                                    <Button className="btn" variant="primary" type="submit" disabled={formState.isSubmitting}>Submit</Button>
                                    <Button className="btn" variant="outline-primary" type="button" onClick={() => reset()} >Cancel</Button>
                                    </Form.Group>
                                    )
                                }
                    </Form>
                </Container>
            )
        }
