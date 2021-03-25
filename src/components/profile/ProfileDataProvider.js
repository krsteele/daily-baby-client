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

    const toggleDay = (data) => {
        return fetch("http://localhost:8000/users/", {
            method: "PATCH",
            headers: {
                "Authorization": `Token ${localStorage.getItem("db_token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            }).then(getProfile)
        }

        return (
            <ProfileContext.Provider
                value={{
                    getProfile,
                    updateProfile,
                    toggleDay
                }}
                >
                {props.children}
                </ProfileContext.Provider>
            )
}