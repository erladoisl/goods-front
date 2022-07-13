import React, { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { get_goods } from '../../../service/GoodService';


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
                    <a href="/content" className="btn btn-lg btn-dark">Добавить товар</a>
                </p>
            </main>
            <div className="container text-white">
                <h3>Товары для мониторинга:</h3>
                <table className="table text-white">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {goods.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row"> {i + 1} </th>
                                    <td>{item.name}</td>
                                    <td>
                                        <NavLink to='/good-view'
                                            state={{name: item.name, id: item.id}}
                                            className="link-light" >
                                            Просмотреть
                                        </NavLink>
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