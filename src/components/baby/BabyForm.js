import React, { useContext, useEffect, useState } from "react"

import { BabyContext } from "../baby/BabyDataProvider"

// React-Hook-Form
import { useForm } from "react-hook-form"

// React-Bootstrap Component imports
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"

export const BabyForm = (props) => {
    const { getBaby, createBaby, updateBaby, getRelationships, relationships } = useContext(JournalContext)
    const { getBabies, babies } = useContext(BabyContext)
    
    const [baby, setBaby] = useState({})
    const [image, setImage] = useState("")
    const [editModeImage, setEditModeImage] = useState("")
    const [fileInputLabel, setFileInputLabel] = useState("Upload an image")


    //  Grab needed functions from React-Form-Hook
    const { register, handleSubmit, errors, formState, reset } = useForm()

    // Get data needed to render dropdown and check for edit mode
    useEffect(() => {
        getRelationships()
        getBabyInEditMode()
    }, [])
}