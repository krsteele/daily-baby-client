import React from "react"
import Button from "react-bootstrap/Button"


export const Logout = (props) => {
    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear()
        props.history.push("/login")
    } 
    
    return (
                <form onSubmit={handleLogout}>
                    <Button type="submit" size="lg" variant="primary">
                        Log out
                    </Button>
                </form>
    )
}