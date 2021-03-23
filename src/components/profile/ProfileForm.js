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