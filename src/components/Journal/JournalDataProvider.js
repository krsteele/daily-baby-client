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

        return (
            <JournalContext.Provider
                value={{
                    getJournal,
                    entries,
                    addJournalEntry,
                    updateJournalEntry
                }}
                >
                {props.children}
                </JournalContext.Provider>
            )
}