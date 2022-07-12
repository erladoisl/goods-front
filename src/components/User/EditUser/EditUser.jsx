import React from 'react';
import { Context } from "../../../contexts/index";
import UsersService from '../../../service/UsersService';
import c from './EditUser.module.css';


const usersService = new UsersService();


const EditUser = (() => {
    const [state, dispatch] = React.useContext(Context);
    const [messageHTML, setMessageHTML] = React.useState('');
    const [formData, setFormData] = React.useState({
        name: state.user.name,
        email: state.user.email,
        first_name: state.user.first_name,
        last_name: state.user.last_name,
    });

    const handleSubmit = ((e) => {
        e.preventDefault();
        usersService.editUser(formData).then(function (result) {
            if (result.error === false) {
                dispatch({ 'type': 'edit_user', 'user': formData });
            };
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
                <h1 className="h3 mb-3 fw-normal">Редактирование данных пользователя</h1>

                <form onSubmit={handleSubmit}>
                    {messageHTML}

                    <div className="form-floating p-1">
                        <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} name="name" className="form-control" required disabled />

                        <label htmlFor="floatingInput">Login</label>
                    </div>

                    <div className="form-floating p-1">
                        <input value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} type="first_name" className="form-control" />

                        <label htmlFor="floatingInput">Имя</label>
                    </div>

                    <div className="form-floating p-1">
                        <input value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} type="last_name" className="form-control" />

                        <label htmlFor="floatingInput">Фамилия</label>
                    </div>

                    <div className="form-floating p-1">
                        <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="name" className="form-control" />

                        <label htmlFor="floatingInput">email</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-dark" type="submit" >Сохранить</button>
                </form>
            </div>
        </div>
    );
});


export default EditUser;