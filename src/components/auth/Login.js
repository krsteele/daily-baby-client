import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import Button from "react-bootstrap/Button"
import "./auth.css"
import Logo from '../../images/daily-baby-logo-trans.png'



export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const history = useHistory()

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
            invalidDialog.current.showModal()
            }
        })
    }

    return (
        <main className="">
            <div className="login__background"></div>
        <dialog className="dialog dialog--auth" ref={invalidDialog}>
            <div>Email or password was not valid.</div>
            <button className="button--close" onClick={(e) => invalidDialog.current.close()}>
            Close
            </button>
        </dialog>
        <div className="login__form">

        <section>
            <div className="login__logo">
                <img src={Logo} alt="Daily Baby logo" />
                <h1>Daily Baby</h1>
            </div>
            <form onSubmit={handleLogin}>
            <h3>Please sign in</h3>
            <fieldset>
                <label htmlFor="inputUsername"> Username </label>
                <input
                ref={username}
                type="username"
                id="username"
                className="form-control"
                defaultValue="me@me.com"
                placeholder="Username"
                required
                autoFocus
                />
            </fieldset>
            <fieldset>
                <label htmlFor="inputPassword"> Password </label>
                <input
                ref={password}
                type="password"
                id="password"
                className="form-control"
                defaultValue="me"
                placeholder="Password"
                required
                />
            </fieldset>
            <fieldset
                style={{
                    textAlign: "center",
                }}
                >
                <Button className="btn btn-1 btn-sep icon-send" type="submit">
                Sign In
                </Button>
            </fieldset>
            </form>
        </section>
        <section className="link--register">
            <Link to="/register">Not a member yet?</Link>
        </section>
                </div>
        </main>
    )
}
