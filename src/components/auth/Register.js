import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import Button from "react-bootstrap/Button"


export const Register = (props) => {
    const history = useHistory()
    
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()

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
        passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>
        <dialog className="dialog dialog--password" ref={passwordDialog}>
            <div>Passwords do not match</div>
            <button className="button--close" onClick={(e) => passwordDialog.current.close()}>
            Close
            </button>
        </dialog>

        <form className="form--login" onSubmit={handleRegister}>
            <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
            <fieldset>
            <label htmlFor="firstName"> First Name </label>
            <input
                ref={firstName}
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First name"
                required
                autoFocus
            />
            </fieldset>
            <fieldset>
            <label htmlFor="lastName"> Last Name </label>
            <input
                ref={lastName}
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Last name"
                required
            />
            </fieldset>
            <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
            <input
                ref={email}
                type="email"
                name="email"
                className="form-control"
                placeholder="Email address"
                required
            />
            <fieldset>
            <label htmlFor="username"> Userame </label>
            <input
                ref={username}
                type="text"
                name="username"
                className="form-control"
                placeholder="Userame"
                required
            />
            </fieldset>
            </fieldset>
            <fieldset>
            <label htmlFor="inputPassword"> Password </label>
            <input
                ref={password}
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                required
            />
            </fieldset>
            <fieldset>
            <label htmlFor="verifyPassword"> Verify Password </label>
            <input
                ref={verifyPassword}
                type="password"
                name="verifyPassword"
                className="form-control"
                placeholder="Verify password"
                required
            />
            </fieldset>
            <fieldset
            style={{
                textAlign: "center",
            }}
            >
            <Button className="btn btn-1 btn-sep icon-send" type="submit">
                Register
            </Button>
            </fieldset>
        </form>
        <section className="link--register">
            Already registered? <Link to="/login">Login</Link>
        </section>
        </main>
    )
    }
