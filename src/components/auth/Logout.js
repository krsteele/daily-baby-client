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
                    <fieldset>
                        <Button type="submit" variant="secondary">
                            Log out
                        </Button>
                    </fieldset>
                </form>
    )
}