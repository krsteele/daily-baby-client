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
        if (profile.profile_image) {
            setImage(profile.profile_image)
        } else {
            setImage(https://res.cloudinary.com/fluffydaydream/image/upload/v1615834269/blank-profile-picture-973460_640_rtmmdv.png)
        }
    }, [profile])


    // How will I handle days of the week?
    const profileUpdate = (data) => {
        data.profileImage = image
        console.log("Here's the data that will be sent", data)
    }

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