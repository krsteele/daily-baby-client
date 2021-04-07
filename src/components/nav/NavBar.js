import React from "react"
import { Route } from "react-router-dom"
import { Logout } from "../auth/Logout"
import { AddEntryButton } from "../Journal/AddEntryButton"
// React-Bootstrap Component imports
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

import Logo from '../../images/daily-baby-logo-trans.png'


export const NavBar = (props) => {
    return (
        <>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/" className="my-auto">
                <img
                    src={Logo}
                    height="50"
                    className="d-inline-block align-top"
                    alt="Daily Baby logo"
                />
                <Navbar.Text>
                    Daily Baby
                </Navbar.Text>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Journals</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                    <Route render={props => <AddEntryButton {...props} />} />
                    <Route render={props => <Logout {...props} />} />
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </>
    )
}