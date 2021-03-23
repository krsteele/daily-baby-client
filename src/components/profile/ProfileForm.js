import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileDataProvider"

// React-Hook-Form
import { useForm } from "react-hook-form"

// React-Bootstrap Component imports
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Alert from "react-bootstrap/Alert"
import Image from "react-bootstrap/Image"

export const ProfileForm = (props) => {
    const { getProfile, updateProfile,  } = useContext(ProfileContext)
    const [profile, setProfile] = useState({dailyuser:{user:{}}, dailyuser_days: [], userbabies: []})

    const [image, setImage] = useState("")
    const [editModeImage, setEditModeImage] = useState("")
    const [fileInputLabel, setFileInputLabel] = useState("Upload a profile image")

    //  Grab needed functions from React-Form-Hook
    const { register, handleSubmit, errors, formState, reset } = useForm()

    // Retrieve profile data to be edited and set state
    useEffect(() => {
        getProfile()
            .then((returnedProfile) => {
                setProfile(returnedProfile)
            })
    }, [])
    
    //  Conditionally set profile image state
    useEffect(() => {
        console.log(profile.dailyuser.profile_image)
        if (profile.dailyuser.profile_image) {
            setImage(profile.dailyuser.profile_image)
        } else {
            setImage("https://res.cloudinary.com/fluffydaydream/image/upload/v1615834269/blank-profile-picture-973460_640_rtmmdv.png")
        }
    }, [profile])


    // How will I handle days of the week?
    const profileUpdate = (data) => {
        data.profileImage = image
        console.log("Here's the data that will be sent", data)
    }

    // image upload
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
                setImage(file.secure_url)
            }
        ).then(() => {
            setFileInputLabel("Change profile pic"); 
        })
    }


    return (
        <Container>
            <h2>Edit Profile and Preferences</h2>

            <Image src={image} />

            <Form.Group controlId="form__firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                    ref={register({required: true})} 
                    name="firstName" type="text" 
                    defaultValue={profile.dailyuser.user.first_name} 
                    style={{borderColor: errors.firstName && "red"}} />
            </Form.Group>

            <Form.Group controlId="form__lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                    ref={register({required: true})} 
                    name="lastName" 
                    type="text" 
                    defaultValue={profile.dailyuser.user.last_name} 
                    style={{borderColor: errors.lastName && "red"}} />
            </Form.Group>

            <Form.Group controlId="form__email">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    ref={register({required: true})}
                    name="email"
                    type="email" 
                    defaultValue={profile.dailyuser.user.email}
                    style={{borderColor: errors.email && "red"}} />
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

            <h3>Text Reminder Preferences</h3>

            {/* phone number */}

            {/* text time */}

            {/* days of week to be texted */}

            {/* update and cancel buttons */}
        </Container>
    )

}