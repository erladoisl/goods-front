import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { get_links } from '../../../../service/GoodService';
import { useState } from "react";
import Graph from "./Graph/Graph";


const Good = (() => {
    const { state } = useLocation();
    const [links, set_links] = useState([])

    useEffect(() => {
        fetch_links(state.id);
    }, [])

    const fetch_links = async (good_id) => {
        get_links(good_id).then(response => {
            set_links(response)
        })
    };

    return (
        <div className="container text-white">
            <h3> {state.name} </h3>
            {links.map((item, i) => {
                return (
                    <div key={i} className='text-start'>
                        <h4> {item.name} </h4>
                        <div>Ссылка: {item.link}</div>
                        <div>Ссылка: {item.id}</div>
                        <Graph link_id = {item.id}/>
                    </div>
                )
            })}
        </div>
    )
});


export default Good;