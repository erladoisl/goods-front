import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { get_prices } from '../../../../../service/GoodService';
import { useState } from "react";


const Graph = ((props) => {
    const { state } = useLocation();
    const [prices, set_prices] = useState([])

    useEffect(() => {
        fetch_prices(props.link_id);
    }, [])

    const fetch_prices = async (link_id) => {
        get_prices(link_id).then(response => {
            set_prices(response)
        })
    };

    return (
        <div className="container text-white">
            {prices.map((item, i) => {
                return (
                    <div key={i} className='text-start'>
                        <h4> {item.date} </h4>
                        <div> {item.price}</div>
                    </div>
                )
            })}
        </div>
    )
});


export default Graph;