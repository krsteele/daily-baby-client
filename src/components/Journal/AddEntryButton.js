import React from "react"
import Button from "react-bootstrap/Button"

export const AddEntryButton = (props) => {
    
    return (
        <Button type="button" size="lg" variant="primary" onClick={() => props.history.push("/journal/create")}>+ Journal Entry</Button> 
    )
}