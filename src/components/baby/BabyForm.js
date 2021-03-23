import React, { useContext, useEffect, useState } from "react"

import { BabyContext } from "../baby/BabyDataProvider"

// React-Hook-Form
import { useForm } from "react-hook-form"

// React-Bootstrap Component imports
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"

export const BabyForm = (props) => {
    const { getBaby, createBaby, updateBaby, getRelationships, relationships } = useContext(BabyContext)
    
    const [baby, setBaby] = useState({})
    const [image, setImage] = useState("")
    const [editModeImage, setEditModeImage] = useState("")
    const [fileInputLabel, setFileInputLabel] = useState("Upload a profile image")
    const [parent, setParent] = useState(null)

    //  Grab needed functions from React-Form-Hook
    const { register, handleSubmit, errors, formState, reset } = useForm()

    // Get data needed to render dropdown and check for edit mode
    useEffect(() => {
        getRelationships()
        getBabyInEditMode()
    }, [])

    useEffect(() => {
        relationship = baby.relationship.type
        relationship === "Mother" || relationship === "Father" ? (
            setParent(true)
        ):(
            setParent(false)
        )
    }, [baby])

    // Check for edit mode
    // If edit mode, get and set baby to be updated
    const editMode = props.match.params.hasOwnProperty("entryId")
    const babyId = props.match.params.babyId

    const getBabyInEditMode = () => {
        if (editMode) {
            getBaby(babyId).then(setBaby).then(() => {
                const babyProfileImage = baby.profile_image
                setEditModeImage(babyProfileImage)
                setFileInputLabel("Update profile pic")
            })
        } 
    }
    // update or create baby
    const BabyCreateUpdate = (data) => {
        if (editMode) {
            data.profileImage = editModeImage
            data.id = babyId
            updateBaby(data)
                .then(() => props.history.push("/profile"))
        } else {
            createBaby({
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                nickname: data.nickname,
                birthdate: data.birthdate,
                relationship: data.relationship,
                profileImage: image
            })
            .then(() => props.history.push("/profile"))
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
        data.append("upload_preset", "db_profile"); // get the preset
        const url = "https://api.cloudinary.com/v1_1/fluffydaydream/image/upload"
        setFileInputLabel("Loading..."); 
        imageUpload(url, data).then(file => {
            if(editMode){
                setEditModeImage(file.secure_url)
            }
            else {
                setImage(file.secure_url)
            }
        }).then(() => {
            setFileInputLabel("Change profile pic"); 
        })
    }

    return (
        <Container>
            {
                editMode ? (
                    <h2>Edit Child's Profile</h2>
                ):(

                    <h2>Add Child's Information</h2>
                )
            }

            <Form onSubmit={handleSubmit(babyCreateUpdate)}>

                <Form.Group controlId="form__baby">
                    <Form.Label>What is your relationship to this child?</Form.Label>

                        {editMode && entry.by_current_user ? (
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
            </Form>
        </Container>
    )
}