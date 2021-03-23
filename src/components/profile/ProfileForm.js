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

    useEffect(() => {
        
    }, [profile])

    // Watch for profile state change
    // Check to see if profile image exists
    // if not, set image default? to image
    // if yes, set image to image and set file input label to update profile pic


    // function to build the update data and call update function, then push to /profile


    // image upload code

    return (
        <Container>
            <div>Hey, I'm the Profile Edit form! Yay!</div>

            {/* form header */}

            {/* profile image display */}

            {/* first name field */}

            {/* last name field */}

            {/* email field */}

            {/* profile image uploader */}

            {/* texting preferences */}

            {/* phone number */}

            {/* text time */}

            {/* days of week to be texted */}

            {/* update and cancel buttons */}
        </Container>
    )

}