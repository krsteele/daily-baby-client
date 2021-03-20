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

        return (
            <JournalContext.Provider
                value={{
                    getJournal,
                    entries
                }}
                >
                {props.children}
                </JournalContext.Provider>
            )
}