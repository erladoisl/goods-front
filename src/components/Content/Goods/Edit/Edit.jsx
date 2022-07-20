import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { get_links, add_link, edit_good } from '../../../../service/GoodService';
import { useState } from "react";


const Edit = (() => {
    const { state } = useLocation();
    const [links, set_links] = useState([])
    const [goodFormData, setGoodFormData] = React.useState({
        id: state.id,
        name: state.name,
        user_id: -1
    });

    const [newLinkFormData, setNewLinkFormData] = React.useState({
        good_id: -1,
        name: '',
        url: '',
        status: 'active'
    });

    useEffect(() => {
        if (state.id > 0) {
            fetch_links(state.id);
        };
    }, [])

    const fetch_links = async (good_id) => {
        get_links(good_id).then(response => {
            set_links(response)
        })
    };
    
    const addGoodSubmit = ((e) => {
        e.preventDefault();
        console.log(goodFormData)

        if (goodFormData.name != '') {
            edit_good(goodFormData).then(function (result) {
                if (result.error === false) {
                    setGoodFormData({...goodFormData, id: result.id});
                    setNewLinkFormData({
                        ...newLinkFormData,
                        good_id: goodFormData.id})
                    alert(`Успешно сохранено`)
                } else {
                    alert(result.message)
                }
            });
        }
    });

    const addLinkSubmit = ((e) => {
        e.preventDefault();
        if (newLinkFormData.name != '' && newLinkFormData.url != '') {
            add_link({ name: newLinkFormData.name, url: newLinkFormData.url }).then(function (result) {
                if (result.error === false) {
                    fetch_links(state.id);
                    setNewLinkFormData({
                        ...newLinkFormData,
                        name: '',
                        url: ''
                    });
                } else {
                    console.log(result);
                }
            });
        }
    });

    return (
        <div className="container text-white">
            <h4 className="mb-3">{state.id > 0 ? state.name : 'Добавление нового продукта'}</h4>
            <br />
            <form className="needs-validation text-start">
                <div className="row m-1">
                    <div className="col-6 m-auto">
                        <label htmlFor="address" className="form-label">Название продукта</label>
                        <input type='text'
                            value={goodFormData.name}
                            onChange={(e) => setGoodFormData({ ...goodFormData, name: e.target.value })}
                            className="form-control" id="address" placeholder="Название продукта" required="" />
                        <div className="invalid-feedback">
                            Название продукта обязательно для заполнения.
                        </div>
                    </div>
                </div>
                <div className="row m-1">
                    <div className="col-6 m-auto">
                        <button onClick={addGoodSubmit} className="btn btn-secondary">Сохранить</button>
                    </div>
                </div>
                <br />
                <div className="row m-1">
                    <div className="mb-3 col-6 m-auto">{links.length == 0 ? 'Не добавлено ни одной ссылки на продукт' : 'Добавленные ссылки:'}</div>
                </div>
                {links.map((item, i) => {
                    return (
                        <div key={i} className="row g-3">
                            <hr />
                            <div className='col-6 m-auto'>
                                <h4> {item.name} </h4>
                                <div>Ссылка: {item.link}</div>
                            </div>
                        </div>
                    )
                })}

                <hr />

                <br />

                <div className="row">
                    <div className="col-6 m-auto">
                        <div className="row">
                            <h5 className="mb-3 col-12 m-auto">Добавление новой ссылки:</h5>
                            <div className="col-12 m-1">
                                {/* <label for="address" className="form-label">Название магазина</label> */}
                                <input type='text'
                                    value={newLinkFormData.name}
                                    onChange={(e) => setNewLinkFormData({ ...newLinkFormData, name: e.target.value })}
                                    className="form-control" id="address" placeholder="Название магазина" required="" />
                                <div className="invalid-feedback">
                                    Название магазина обязательно для заполнения.
                                </div>
                            </div>
                            <div className="col-12 m-1">
                                {/* <label for="address" className="form-label">Ссылка на товар</label> */}
                                <input type='text'
                                    value={newLinkFormData.url}
                                    onChange={(e) => setNewLinkFormData({ ...newLinkFormData, url: e.target.value })}
                                    className="form-control" id="address" placeholder="Ссылка на товар" required="" />
                                <div className="invalid-feedback">
                                    Ссылка на товар обязательно для заполнения.
                                </div>
                            </div>
                            <div className="col-12 m-1">
                                <button onClick={addLinkSubmit} className="btn btn-secondary">Добавить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    )
});

export default Edit;