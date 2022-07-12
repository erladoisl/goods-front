import React from 'react';
import { Context } from "../../../../contexts/index";
import UsersService from '../../../../service/UsersService';
import c from '../EditUser.module.css';


const usersService = new UsersService();


const EditPass = (() => {
    const [state, dispatch] = React.useContext(Context)
    const [messageHTML, setMessageHTML] = React.useState('');
    const [formData, setFormData] = React.useState({
        'name': state.user.name,
        'oldPassword': '',
        'password1': '',
        'password2': '',
    });

    const handleSubmit = ((e) => {
        e.preventDefault()
        usersService.changePass(formData).then(function (result) {
            setMessageHTML(getMessageHTML(result));
        });
    });

    const getMessageHTML = ((response) => {
        if (response.error || response.message !== '') {
            return (
                <div className={`alert alert-${response.error ? 'danger' : 'success'}`} role="alert">
                    {response.message}
                </div>
            );
        } else {
            return '';
        };
    });

    return (
        <div className={c.text_center}>
            <div className={c.form_signin}>
                <h1 className="h3 mb-3 fw-normal">Изменение пароля</h1>

                <form onSubmit={handleSubmit}>
                    {messageHTML}

                    <div className="form-floating p-1">
                        <input value={formData.oldPassword} onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })} type="password" className="form-control" required />

                        <label htmlFor="floatingPassword">Старый пароль</label>
                    </div>

                    <div className="form-floating p-1">
                        <input value={formData.password1} onChange={(e) => setFormData({ ...formData, password1: e.target.value })} type="password" className="form-control" required />

                        <label htmlFor="floatingPassword">Новый пароль</label>
                    </div>

                    <div className="form-floating p-1">
                        <input value={formData.password2} onChange={(e) => setFormData({ ...formData, password2: e.target.value })} type="password" className="form-control" required />

                        <label htmlFor="floatingPassword">Повторите новый пароль</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-dark" type="submit" >Сохранить</button>
                </form>
            </div>
        </div>
    );
});


export default EditPass;