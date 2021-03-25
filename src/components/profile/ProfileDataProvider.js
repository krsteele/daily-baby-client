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
        return fetch(`http://localhost:8000/users/${profile.userId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("db_token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
            }).then(getProfile)
        }

        const toggleDay = (id, data) => {
            console.log(data, id)
            return fetch(`http://localhost:8000/users/${id}`, {
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