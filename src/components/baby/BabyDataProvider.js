import React, {useState} from "react"

export const BabyContext = React.createContext()

export const BabyDataProvider = (props) => {

    const [babies, setBabies] = useState([])

    const getBabies = () => {
        return fetch("http://localhost:8000/babies", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("db_token")}`,
            },
        })
            .then(res => res.json())
            .then(setBabies)
    }

    const getBaby = (id) => {
        return fetch(`http://localhost:8000/babies/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("db_token")}`,
            },
        })
            .then(res => res.json())
    }

    const updateBaby = (baby) => {
        return fetch(`http://localhost:8000/babies/${baby.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("db_token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(baby),
            })
        }
    
        const createBaby = (baby) => {
        return fetch("http://localhost:8000/babies", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("db_token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(baby),
            })
        }

        return (
            <BabyContext.Provider
                value={{
                    getBabies,
                    babies,
                    getBaby,
                    updateBaby,
                    createBaby
                }}
                >
                {props.children}
                </BabyContext.Provider>
            )
}