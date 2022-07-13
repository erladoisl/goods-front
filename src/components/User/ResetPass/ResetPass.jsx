import { NavLink } from "react-router-dom";
import c from './ResetPass.module.css';
import Contact from '../Contact/Contact';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sendPasswordReset } from "../../../service/UserService";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";


const ResetPass = (() => {
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    let errorMessageHTML = '';

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/content");
    }, [user, loading]);

    const handleSubmit = ((e) => {
        e.preventDefault()
        sendPasswordReset(email).then(function (result) {
            if (result.error === true) {
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
        <div className={c.text_center}>
            <div className={c.form_signin}>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal text-white">Смена пароля</h1>

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

                    <button className="w-100 btn btn-lg btn-dark my-1" type="submit" >Отправить ссылку на смену пароля</button>

                    <NavLink to='/' className="nav-link text-white">
                        Войти по почте и паролю
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


export default ResetPass;