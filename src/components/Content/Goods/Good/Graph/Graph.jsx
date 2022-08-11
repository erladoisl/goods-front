import React, { useEffect } from "react";
import { get_prices } from "../../../../../service/GoodService";
import { useState } from "react";
import Chart from "react-apexcharts";

const format_data = (prices = []) => {
  const dates = [];
  const values = [];

  prices.forEach(function (item, i) {
    dates.push(item.date.toDate().toLocaleDateString());
    values.push(item.price);
  });
  return {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: dates,
      },
    },
    series: [
      {
        name: "стоимость",
        data: values,
      },
    ],
  };
};

const Graph = (props) => {
  const [prices, set_prices] = useState(format_data());
  const [last_price, set_last_price] = useState("-");
  const [last_date, set_last_date] = useState("-");

  useEffect(() => {
    fetch_prices(props.link_id);
  }, [props.link_id]);

  const fetch_prices = async (link_id) => {
    get_prices(link_id).then((response) => {
      if (response.length > 0) {
        set_prices(format_data(response));
        set_last_price(response[response.length - 1].price);
        set_last_date(
          response[response.length - 1].date.toDate().toLocaleDateString("ru")
        );
      }
    });
  };

  return (
    <div className="row">
      <div className="row">
        <div className="col-12 text-start text-light">
          <h5>
            {" "}
            Последняя цена на {last_date}: {last_price} рублей
          </h5>
        </div>
      </div>

      <div className="row">
        <div className="container col-md-6 text-dark">
          <Chart
            options={prices.options}
            series={prices.series}
            className=""
            type="line"
          />
        </div>
      </div>
    </div>
  );
};

export default Graph;
