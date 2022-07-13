import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "../../../service/UserService";
import Contact from '../Contact/Contact';
import c from './Registration.module.css';

const Registration = (() => {
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const register = (e) => {
        e.preventDefault()
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password).then(function (result) {
            if (result.error === false) {
                setErrorMessage(result.message);
            };
        });
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/content");
    }, [user, loading]);

    let errorMessageHTML = '';

    if (error) {
        errorMessageHTML = (
            <div class="alert alert-danger" role="alert">
                {errorMessage}
            </div>);
    };

    return (
        <div className={c.text_center}>
            <div className={c.form_signin}>
                <h1 className="h3 mb-3 fw-normal text-white">Регистрация</h1>

                <form onSubmit={register}>
                    {errorMessageHTML}

                    <div className="form-floating p-1">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Полное Имя"
                            type="login"
                            className="form-control" required />

                        <label htmlFor="floatingInput">Имя</label>
                    </div>

                    <div className="form-floating p-1">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail"
                            type="name"
                            className="form-control" required />

                        <label htmlFor="floatingInput">email</label>
                    </div>

                    <div className="form-floating p-1">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Пароль"
                            type="password"
                            className="form-control" required />

                        <label htmlFor="floatingPassword">Пароль</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-dark" type="submit" >Зарегистрироваться</button>

                    <NavLink to='/' className="nav-link text-white">
                        Войти
                    </NavLink>
                </form>

                <Contact />
            </div>
        </div>
    );
});


export default Registration;