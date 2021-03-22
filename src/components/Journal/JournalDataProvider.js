import React, {useState} from "react"

export const JournalContext = React.createContext()

export const JournalDataProvider = (props) => {
    const [entries, setEntries] = useState([{photo: {}, user_baby: {baby: {}, user: {user: {}}}}])

    const getJournal = (id) => {
        return fetch(`http://localhost:8000/entries?babyId=${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("db_token")}`,
            },
        })
            .then(res => res.json())
            .then(setEntries)
    }

    const getEntry = (id) => {
        return fetch(`http://localhost:8000/entries/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("db_token")}`,
            },
        })
            .then(res => res.json())
    }

    const addJournalEntry = (entry) => {
        return fetch("http://localhost:8000/entries", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("db_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
    }
    
    const updateJournalEntry = (entry) => {
        return fetch(`http://localhost:8000/entries/${entry.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("db_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
    }

    const deleteEntry = id => {
        return fetch(`http://localhost:8000/entries/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("db_token")}`,
            },
        })
    }

        return (
            <JournalContext.Provider
                value={{
                    getJournal,
                    getEntry,
                    entries,
                    addJournalEntry,
                    updateJournalEntry,
                    deleteEntry
                }}
                >
                {props.children}
                </JournalContext.Provider>
            )
}