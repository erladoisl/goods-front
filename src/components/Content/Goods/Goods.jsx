import React, { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { get_goods, delete_good } from '../../../service/GoodService';


const Goods = (() => {
    const [goods, set_goods] = useState([])

    useEffect(() => {
        fetch_goods();
    }, [])

    const fetch_goods = async () => {
        const data = get_goods().then(response => {
            set_goods(response)
        });
    }

    return (
        <div>
            <main>
                <p className="lead text-end">
                    <NavLink to='/edit-good'
                        state={{ id: -1, name: '' }}
                        className="btn btn-lg btn-dark" >
                        Добавить товар
                    </NavLink>
                    {/* <a href="/content" className="btn btn-lg btn-dark">Добавить товар</a> */}
                </p>
            </main>
            <div className="container text-white">
                <h3>Товары для мониторинга:</h3>
                <table className="table text-white text-start">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col"> </th>
                            <th scope="col"> </th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {goods.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <th className="col-1" scope="row"> {i + 1} </th>
                                    <td className="col-6">{item.name}</td>
                                    <td className="col-1">
                                        <NavLink to='/good-view'
                                            state={{ name: item.name, id: item.id }}
                                            className="link-light" >
                                            Просмотреть
                                        </NavLink>
                                    </td>
                                    <td className="col-1">
                                        <NavLink to='/edit-good'
                                            state={{ name: item.name, id: item.id }}
                                            className="link-light" >
                                            Редактировать
                                        </NavLink>
                                    </td>
                                    <td className="col-1">
                                        <button className="btn btn-danger" onClick={() => {delete_good(item.id).then((result) => {if (result.error === false) {fetch_goods()}})}}>Х</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
});


export default Goods;