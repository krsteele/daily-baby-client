import React, {useState} from "react"

export const ProfileContext = React.createContext()

export const ProfileDataProvider = (props) => {

    const getProfile = () => {
        return fetch("http://localhost:8000/profile", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("db_token")}`,
            },
        })
            .then(res => res.json())
    }

    const updateProfile = (profile) => {
        return fetch(`http://localhost:8000/users/${profile.user.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("db_token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
            }).then(getProfile)
        }

        return (
            <ProfileContext.Provider
                value={{
                    getProfile,
                    updateProfile
                }}
                >
                {props.children}
                </ProfileContext.Provider>
            )
}