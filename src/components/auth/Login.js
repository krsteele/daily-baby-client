import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"

// react-bootstrap
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

// CSS
import "./auth.css"
// DB logo image
import Logo from '../../images/daily-baby-logo-trans.png'


export const Login = () => {
    const username = useRef()
    const password = useRef()
    // const invalidDialog = useRef()
    const history = useHistory()
    // modal state
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            username: username.current.value,
            password: password.current.value,
        }),
        })
        .then((res) => res.json())
        .then((res) => {
            if ("valid" in res && res.valid) {
            localStorage.setItem("db_token", res.token)
            history.push("/")
            } else {
            // invalidDialog.current.showModal()
            handleShow()
            }
        })
    }

    return (
        <main style={{ textAlign: "center" }} className="auth--background">

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>Uh-oh! Invalid email or password.</Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>

        {/* <dialog className="dialog dialog--auth modal-dialog" ref={invalidDialog}>
            <div className="modal-content">Email or password was not valid.</div>
            <button className="button--close btn btn-secondary" onClick={(e) => invalidDialog.current.close()}>
            Close
            </button>
        </dialog> */}

        <div className="login__form">

        <section>
            <div className="login__logo">
                <img src={Logo} alt="Daily Baby logo" className="logo__img" />
                <h1>Daily Baby</h1>
            </div>

            <Form onSubmit={handleLogin}>
            <h5 className="h3 mb-3 font-weight-normal">Please sign in</h5>
            <Form.Group controlId="formUsername">
                <Form.Label> Username </Form.Label>
                <Form.Control
                ref={username}
                type="username"
                className="form-control"
                defaultValue="me@me.com"
                placeholder="Username"
                required
                autoFocus
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label> Password </Form.Label>
                <Form.Control
                ref={password}
                type="password"
                className="form-control"
                defaultValue="me"
                placeholder="Password"
                required
                />
            </Form.Group>
            <Form.Group
                style={{
                    textAlign: "center",
                }}
                >
                <Button className="btn btn-1 btn-sep icon-send" type="submit">
                Sign In
                </Button>
            </Form.Group>
            </Form>
            <Link to="/register">Not a member yet?</Link>
        </section>
                </div>
        </main>
    )
}
