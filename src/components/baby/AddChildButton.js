import React from "react"
import Button from "react-bootstrap/Button"

export const AddChildButton = (props) => {
    
    return (
        <Button type="button" variant="primary" onClick={() => props.history.push("/children/create")}>+ New Child</Button> 
    )
}