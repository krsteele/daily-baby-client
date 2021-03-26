import React from "react"
import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom"


export const Logout = (props) => {
    const history = useHistory()

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear()
        history.push("/login")
    } 
    
    return (
                
                    <Button type="button" size="sm" variant="primary" onClick={(e) => handleLogout(e)}>
                        Log out
                    </Button>
                
    )
}