import React, { useEffect, useState, useContext } from "react"

import { ProfileContext } from "./ProfileDataProvider"

// react-bootstrap components


export const ProfileDetail = (props) => {

    const { getProfile, profile } = useContext(ProfileContext)

    useEffect(() => {
        getProfile()
    }, [])

    useEffect(() => {
        console.log("gotten profile", profile)
    }, [profile])

    return(
        <>
            <div>Hey, I'm a profile!</div>
        </>
    )
}