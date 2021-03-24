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

// Phone Input
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export const ProfileForm = (props) => {
    // requests for profile GET and PUT
    const { getProfile, updateProfile } = useContext(ProfileContext)
    // profile state
    const [profile, setProfile] = useState({dailyuser:{user:{}}, dailyuser_days: [], userbabies: []})
    // profile image state
    const [image, setImage] = useState("")
    // profile image file input message state
    const [fileInputLabel, setFileInputLabel] = useState("Upload a profile image")
    // phone number state
    const [phone, setPhone] = useState(null)



    //  Grab needed functions from React-Form-Hook
    const { register, handleSubmit, errors, formState, reset } = useForm()

    // Retrieve profile data to be edited and set state
    useEffect(() => {
        getProfile()
            .then((returnedProfile) => {
                setProfile(returnedProfile)
            })
    }, [])
    
    useEffect(() => {
        //  Conditionally set state for profile image
        if (profile.dailyuser.profile_image) {
            setImage(profile.dailyuser.profile_image)
        } else {
            setImage("https://res.cloudinary.com/fluffydaydream/image/upload/v1615834269/blank-profile-picture-973460_640_rtmmdv.png")
        }
        //  Conditionally set state for phone 
        if (profile.dailyuser.phone_number) {
            setPhone(profile.dailyuser.phone_number)
        } else {
            setPhone("")
        }
    }, [profile])


    // How will I handle days of the week?
    const profileUpdate = (data) => {
        data.profileImage = image
        console.log("Here's the data that will be sent", data)
    }

    // request to cloudinary api
    const imageUpload = (url, data) => {
        return fetch(url, {
            method: 'POST',
            body: data
        })
        .then(res => res.json())
    }

    const uploadImage = (e) => {
        const files = e.target.files; // get the files that have been selected by the user
        const data = new FormData(); // instantiate a data object?
        data.append("file", files[0]); //get file that has been uploaded and append it to the data object
        data.append("upload_preset", "db_profile"); // add the name of the cloudinary preset to the data object
        const url = "https://api.cloudinary.com/v1_1/fluffydaydream/image/upload"; // cloudinary url for fetch call assigned to variable
        setFileInputLabel("Loading..."); // set the state of file input field message
        // call the image upload function and pass the fetch url and the data object as arguments
        imageUpload(url, data).then(file => {
            // set image state with returned url
                setImage(file.secure_url)
            }
        ).then(() => {
            setFileInputLabel("Change profile pic"); // set state of file input field message
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
            <PhoneInput
                country={'us'}
                onlyCountries={'us'}
                autoFormat={true}
                value={phone}
                onChange={phone => setPhone(phone)}
            

            />
            {/* text time */}

            {/* days of week to be texted */}

            {/* update and cancel buttons */}
        </Container>
    )

}