import { NavLink } from "react-router-dom";
import c from './Login.module.css';
import Contact from '../Contact/Contact';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../../firebase";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";


const Login = (() => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    let errorMessageHTML = '';

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/content");
    }, [user, loading]);

    const handleSubmit = ((e) => {
        e.preventDefault()
        logInWithEmailAndPassword(email, password).then(function (result) {
            if (result.error === true) {
                setError(result.error)
                setErrorMessage(result.message)
            }
        });
    });


    if (error) {
        errorMessageHTML = (
            <div className="alert alert-danger" role="alert">
                {errorMessage}
            </div>);
    }


    return (
        <div className={`${c.text_center}`}>
            <div className={c.form_signin}>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal text-white">Вход</h1>

                    {errorMessageHTML}

                    <div className="form-floating py-1">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail Address"
                            type="text"
                            className="form-control" required />

                        <label htmlFor="floatingInput">email</label>
                    </div>

                    <div className="form-floating py-1">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            type="password"
                            className="form-control" required />

                        <label htmlFor="floatingPassword">Пароль</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-dark my-1" type="submit" >Войти</button>

                    <button className="w-100 btn btn-lg btn-success my-1" onClick={signInWithGoogle}>
                        Войти через Google
                    </button>
                    <NavLink to='/reset' className="nav-link text-white">
                        Забыл Пароль
                    </NavLink>

                    <NavLink to='/register' className="nav-link text-white">
                        Зарегистрироваться
                    </NavLink>

                    <Contact />
                </form>
            </div>
        </div>
    );
});


export default Login;