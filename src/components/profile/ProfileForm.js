import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileDataProvider"
import { useHistory } from "react-router-dom"

// React-Hook-Form
import { useForm } from "react-hook-form"

// React-Bootstrap Component imports
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Alert from "react-bootstrap/Alert"
import Image from "react-bootstrap/Image"
import InputGroup from 'react-bootstrap/InputGroup'
import { Row } from "react-bootstrap"


export const ProfileForm = (props) => {
    const history = useHistory()

    // requests for profile GET and PUT
    const { getProfile, updateProfile } = useContext(ProfileContext)
    // profile state
    const [profile, setProfile] = useState({dailyuser:{user:{}}, userbabies: []})
    // profile image state
    const [image, setImage] = useState("")
    // profile image file input message state
    const [fileInputLabel, setFileInputLabel] = useState("Upload a profile image")
    // state for days of the week, used to toggle checkboxes
    const [monday, setMonday] = useState(false)
    const [tuesday, setTuesday] = useState(false)
    const [wednesday, setWednesday] = useState(false)
    const [thursday, setThursday] = useState(false)
    const [friday, setFriday] = useState(false)
    const [saturday, setSaturday] = useState(false)
    const [sunday, setSunday] = useState(false)


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
        console.log("monday value", profile.dailyuser.monday)
        // set checked status to value of days of the week
        setMonday(profile.dailyuser.monday)
        setTuesday(profile.dailyuser.tuesday)
        setWednesday(profile.dailyuser.wednesday)
        setThursday(profile.dailyuser.thursday)
        setFriday(profile.dailyuser.friday)
        setSaturday(profile.dailyuser.saturday)
        setSunday(profile.dailyuser.sunday)
    }, [profile])


    // Update the user instance
    const profileUpdate = (data) => {
        data.profileImage = image
        data.userId = profile.dailyuser.id
        updateProfile(data).then(() => history.push("/profile"))
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

            <Form onSubmit={handleSubmit(profileUpdate)}>

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
                {
                    profile.userbabies.length < 0 
                    ? (
                        <Alert variant="warning">Please 
                            <Alert.Link href="/children/create">add a child</Alert.Link> to begin your journal.</Alert>
                    ):(
                        ""
                    )
                } 

                <Form.Group>
                    <Form.Label>What phone number would you like to use for reminders?</Form.Label>
                    <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="countryCode">+1</InputGroup.Text>
                    </InputGroup.Prepend>
                        <Form.Control 
                            ref={register}
                            type='number'
                            name='phone'
                            defaultValue={profile.dailyuser.phone_number}
                            minLength={10}
                            maxLength={10}
                            pattern='[0-9]*'
                        />
                    </InputGroup>
                </Form.Group>
                
                <Form.Group controlId="form__textTime">
                    <Form.Label>Time of day you would like to receive text reminders:</Form.Label>
                    <Form.Control 
                        ref={register} 
                        type="time" 
                        name='textTime' 
                        defaultValue={profile.dailyuser.text_time} 
                        />
                </Form.Group>

                <Form.Label>Which days of the week work best for you?</Form.Label>
                <Form.Group as={Row} xs={1}>
                    <Form.Check 
                        inline 
                        ref={register}
                        className='custom-control custom-checkbox' 
                        key='monday' 
                        label='Monday' 
                        type="checkbox" 
                        name='monday' 
                        checked={monday}
                        onChange={evt => setMonday(!monday)} />
                    <Form.Check 
                        inline 
                        ref={register}
                        className='custom-control custom-checkbox' 
                        key='tuesday' 
                        label='Tuesday' 
                        type="checkbox" 
                        name='tuesday' 
                        checked={tuesday}
                        onChange={evt => setTuesday(!tuesday)} />
                    <Form.Check 
                        inline 
                        ref={register}
                        className='custom-control custom-checkbox' 
                        key='wednesday' 
                        label='Wednesday' 
                        type="checkbox" 
                        name='wednesday' 
                        checked={wednesday}
                        onChange={evt => setWednesday(!wednesday)} />
                    <Form.Check 
                        inline 
                        ref={register}
                        className='custom-control custom-checkbox' 
                        key='thursday' 
                        label='Thursday' 
                        type="checkbox" 
                        name='thursday' 
                        checked={thursday}
                        onChange={evt => setThursday(!thursday)} />
                    <Form.Check 
                        inline 
                        ref={register}
                        className='custom-control custom-checkbox' 
                        key='friday' 
                        label='Friday' 
                        type="checkbox" 
                        name='friday' 
                        checked={friday}
                        onChange={evt => setFriday(!friday)} />
                    <Form.Check 
                        inline 
                        ref={register}
                        className='custom-control custom-checkbox' 
                        key='saturday' 
                        label='Saturday' 
                        type="checkbox" 
                        name='saturday' 
                        checked={saturday}
                        onChange={evt => setSaturday(!saturday)} />
                    <Form.Check 
                        inline 
                        ref={register}
                        className='custom-control custom-checkbox' 
                        key='sunday' 
                        label='Sunday' 
                        type="checkbox" 
                        name='sunday' 
                        checked={sunday}
                        onChange={evt => setSunday(!sunday)} />
                </Form.Group>

                <Form.Group>
                    <Button className="btn" variant="primary" type="submit" disabled={formState.isSubmitting}>Update</Button>
                    <Button className="btn" variant="outline-primary" type="button" onClick={() => history.push("/profile")} >Cancel</Button>
                </Form.Group>
            </Form>
        </Container>
    )

}