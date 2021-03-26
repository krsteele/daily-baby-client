import React, { useContext, useEffect, useState } from "react"

import { BabyContext } from "../baby/BabyDataProvider"

// React-Hook-Form
import { useForm } from "react-hook-form"

// React-Bootstrap Component imports
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Alert from "react-bootstrap/Alert"
import Image from "react-bootstrap/Image"



export const BabyForm = (props) => {
    const { getBaby, createBaby, updateBaby, getRelationships, relationships } = useContext(BabyContext)
    
    const [baby, setBaby] = useState({baby: {}, relationship: {}})
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
        const relationship = baby.relationship.type
        relationship === "Mother" || relationship === "Father" ? (
            setParent(true)
        ):(
            setParent(false)
        )
    }, [baby])

    // Check for edit mode
    // If edit mode, get and set baby to be updated
    const editMode = props.match.params.hasOwnProperty("babyId")
    const babyId = props.match.params.babyId

    const getBabyInEditMode = () => {
        if (editMode) {
            getBaby(babyId).then(setBaby).then(() => {
                const babyProfileImage = baby.baby.profile_image
                console.log(babyProfileImage)
                setEditModeImage(babyProfileImage)
                setFileInputLabel("Update profile pic")
            })
        } 
    }
    // update or create baby
    const babyCreateUpdate = (data) => {
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
        <>
            {
                editMode && !parent ? (
                    <Alert key="warning" variant="warning">
                        You are not authorized to make changes to this child's profile.
                    </Alert>
                ):(
                    ""
                )}

                <Container>
                    {
                        editMode && parent ? (
                            <h2>Edit Child's Profile</h2>
                            ):(
                            <h2>Add Child's Information</h2>
                            )
                    }
                    {
                        editMode ? (
                            <Image src={editModeImage} roundedCircle />
                        ) : (
                            <Image src={image} roundedCircle />
                        )
                    }

                    <Form onSubmit={handleSubmit(babyCreateUpdate)}>

                        {editMode && parent ? (
                            ""
                        ):(
                            <Form.Group controlId="form__relationship">
                                <Form.Label>What is your relationship to this child?</Form.Label>
                                    <Form.Control 
                                        ref={register({valueAsNumber: true})} 
                                        name="relationship" 
                                        as="select">
                                        
                                        <option key="0">Choose relationship type</option>
                                        {relationships.map(rel => {
                                            return <option key={rel.id} value={rel.id}>{rel.type}</option>
                                        })}

                                    </Form.Control>
                            </Form.Group>
                        )}  

                        <Form.Group controlId="form__firstName">
                            <Form.Label>Child's First Name</Form.Label>
                            <Form.Control 
                                ref={register({required: true})} 
                                name="firstName" type="text" 
                                defaultValue={baby.baby.first_name} 
                                style={{borderColor: errors.firstName && "red"}} />
                        </Form.Group>
                        
                        <Form.Group controlId="form__middleName">
                            <Form.Label>Child's Middle Name</Form.Label>
                            <Form.Control 
                                ref={register} 
                                name="middleName" 
                                type="text" 
                                defaultValue={baby.baby.middle_name}  />
                        </Form.Group>
                        
                        <Form.Group controlId="form__lastName">
                            <Form.Label>Child's Last Name</Form.Label>
                            <Form.Control 
                                ref={register({required: true})} 
                                name="lastName" type="text" 
                                defaultValue={baby.baby.last_name} 
                                style={{borderColor: errors.lastName && "red"}} />
                        </Form.Group>
                        
                        <Form.Group controlId="form__nickname">
                            <Form.Label>Child's Nickname</Form.Label>
                            <Form.Control 
                                ref={register} 
                                name="nickname" 
                                type="text" 
                                defaultValue={baby.baby.nickname} />
                        </Form.Group>

                        <Form.Group controlId="form__birthdate">
                            <Form.Label>Child's Birthdate</Form.Label>
                            <Form.Control 
                                ref={register} 
                                type="date" 
                                name='birthdate' 
                                default value={baby.baby.birth_date} 
                                />
                        </Form.Group>

                        <Form.Group>
                            <Form.File 
                                ref={register} 
                                name="profileImage" 
                                key="profileImage" 
                                id="profileImage" 
                                label={fileInputLabel} 
                                onChange={uploadImage}  />
                        </Form.Group>

                        {
                        editMode && parent ? (
                            <Form.Group>
                            <Button className="btn" variant="primary" type="submit" disabled={formState.isSubmitting}>Update</Button>
                            <Button className="btn" variant="outline-primary" type="button" onClick={() => props.history.push("/profile")} >Cancel</Button>
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
                
        </>
    )
}