import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
// react-bootstrap
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
// CSS
import "./auth.css"
// DB logo image
import Logo from '../../images/daily-baby-logo-trans.png'


export const Register = (props) => {
    const history = useHistory()
    
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    // const passwordDialog = useRef()

    // modal state
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
        const newUser = {
            "firstName": firstName.current.value,
            "lastName": lastName.current.value,
            "email": email.current.value,
            "password": password.current.value,
            "username": username.current.value
        }

        return fetch("http://127.0.0.1:8000/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .then((res) => res.json())
            .then((res) => {
            if ("valid" in res && res.valid) {
                localStorage.setItem("db_token", res.token)
                history.push("/profile")
            }
            })
        } else {
        // passwordDialog.current.showModal()
        handleShow()
        }
    }

    return (
        <main style={{ textAlign: "center" }} className="auth--background">
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>Oops! These passwords don't match.</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            
            {/* <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={(e) => passwordDialog.current.close()}>
                Close
                </button>
            </dialog> */}

            <div className="login__form">

                <section>

                    <div className="login__logo">
                        <img src={Logo} alt="Daily Baby logo" className="logo__img" />
                        <h1>Daily Baby</h1>
                    </div>

                    <Form className="" onSubmit={handleRegister}>
                        <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                        <Form.Group>
                        <Form.Label htmlFor="firstName"> First Name </Form.Label>
                        <Form.Control
                            ref={firstName}
                            type="text"
                            name="firstName"
                            className="form-control"
                            placeholder="First name"
                            required
                            autoFocus
                        />
                        </Form.Group>
                        <Form.Group>
                        <Form.Label htmlFor="lastName"> Last Name </Form.Label>
                        <Form.Control
                            ref={lastName}
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="Last name"
                            required
                        />
                        </Form.Group>
                        <Form.Group>
                        <Form.Label htmlFor="inputEmail"> Email address </Form.Label>
                        <Form.Control
                            ref={email}
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email address"
                            required
                        />
                        </Form.Group>
                        <Form.Group>
                        <Form.Label htmlFor="username"> Userame </Form.Label>
                        <Form.Control
                            ref={username}
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="Userame"
                            required
                        />
                        </Form.Group>
                        <Form.Group>
                        <Form.Label htmlFor="inputPassword"> Password </Form.Label>
                        <Form.Control
                            ref={password}
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            required
                        />
                        </Form.Group>
                        <Form.Group>
                        <Form.Label htmlFor="verifyPassword"> Verify Password </Form.Label>
                        <Form.Control
                            ref={verifyPassword}
                            type="password"
                            name="verifyPassword"
                            className="form-control"
                            placeholder="Verify password"
                            required
                        />
                        </Form.Group>
                        <Form.Group
                        style={{
                            textAlign: "center",
                        }}
                        >
                        <Button className="btn btn-1 btn-sep icon-send" type="submit">
                            Register
                        </Button>
                        </Form.Group>
                    </Form>
                    Already registered? <Link to="/login">Login</Link>
                </section>
            </div>
        </main>
    )
    }
